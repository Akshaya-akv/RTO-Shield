import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { AiAddressAnalysis } from "@/types";

const AiResponseSchema = z.object({
  address_score: z.number().min(0).max(60),
  risk_flags: z.array(z.string()),
  explanation: z.string().min(5),
  address_quality: z.enum(["GOOD", "MODERATE", "POOR"]),
});

export interface AddressAnalysisInput {
  customerName: string;
  address: string;
  houseFlat?: string;
  streetArea?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  cartItems: { name: string; price: number; quantity: number }[];
}

/**
 * Deterministic fallback analyzer when Gemini API is not configured or fails.
 * Guarantees zero demo interruption while maintaining high heuristic precision.
 */
export function deterministicAddressFallback(input: AddressAnalysisInput): AiAddressAnalysis {
  const fullAddress = `${input.houseFlat || ""} ${input.streetArea || ""} ${input.landmark || ""} ${input.address || ""}`.trim().toLowerCase();
  const rawAddress = input.address.toLowerCase().trim();

  let score = 0;
  const flags: string[] = [];
  const reasons: string[] = [];

  // 1. Keyboard smash / gibberish checks
  const keyboardSmashPatterns = [
    /asdf/i,
    /qwer/i,
    /zxcv/i,
    /hjkl/i,
    /12345/i,
    /(.)\1{3,}/, // 4+ repeating characters like aaaa or xxxx
  ];

  const hasSmash = keyboardSmashPatterns.some((pattern) => pattern.test(rawAddress));
  if (hasSmash || rawAddress.includes("asdfg") || rawAddress.includes("test address")) {
    score = 46;
    flags.push("GIBBERISH_ADDRESS");
    reasons.push("Gibberish or fake address pattern detected with missing house/flat details.");
  }

  // 2. Length & Completeness check
  if (rawAddress.length < 16 && !hasSmash) {
    score += 25;
    flags.push("INSUFFICIENT_ADDRESS_LENGTH");
    reasons.push("Address is suspiciously short (fewer than 16 characters).");
  }

  // 3. Missing house/flat number check
  const hasDigitInAddress = /\d+/.test(input.houseFlat || "") || /\d+/.test(rawAddress);
  const houseFlatKeywords = /(flat|house|h\.no|hno|plot|door|room|apt|apartment|villa|building|bldg|floor)/i;
  const hasHouseKeyword = houseFlatKeywords.test(input.houseFlat || "") || houseFlatKeywords.test(rawAddress);

  if (!hasDigitInAddress && !hasHouseKeyword && !hasSmash) {
    score += 20;
    flags.push("MISSING_HOUSE_NUMBER");
    reasons.push("No house, flat, building number or floor detail found.");
  }

  // 4. Over-reliance on vague landmark without specific residence
  const vagueLandmarkOnly = /^(near|opp|opposite|behind|beside)\s+[a-z0-9\s]{2,25}$/i.test(rawAddress);
  if (vagueLandmarkOnly) {
    score += 20;
    flags.push("VAGUE_LANDMARK_ONLY");
    reasons.push("Address solely contains a broad landmark without residential identification.");
  }

  // 5. Positive signals (complete details)
  const isWellStructured =
    (input.houseFlat && input.houseFlat.length >= 3) &&
    (input.streetArea && input.streetArea.length >= 6) &&
    input.city.length >= 3 &&
    input.state.length >= 3;

  if (isWellStructured && score === 0) {
    score = 5;
    flags.push("VERIFIED_STRUCTURE");
    reasons.push("Structured address containing distinct premise number, street sector, and postal node.");
  }

  // Clamp score to 0 - 60
  const address_score = Math.min(Math.max(score, 0), 60);

  let address_quality: "GOOD" | "MODERATE" | "POOR" = "GOOD";
  if (address_score >= 35) {
    address_quality = "POOR";
  } else if (address_score >= 18) {
    address_quality = "MODERATE";
  }

  const explanation =
    reasons.length > 0
      ? reasons.join(" ")
      : "Address details are consistent with standard Indian postal routing guidelines.";

  return {
    address_score,
    risk_flags: flags,
    explanation,
    address_quality,
    is_fallback: true,
  };
}

/**
 * Evaluates address quality using Google Gemini AI.
 * Strict system prompt ensures zero demographic bias.
 */
export async function analyzeAddressWithGemini(
  input: AddressAnalysisInput
): Promise<AiAddressAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your-gemini-api-key-here" || apiKey.trim().length === 0) {
    return deterministicAddressFallback(input);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Try gemini-2.5-flash or gemini-flash-latest or gemini-1.5-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const prompt = `
You are the AI Risk Verification Engine for RTO-Shield, an enterprise logistics prevention system for Indian D2C e-commerce merchants.

Your sole duty is to inspect the physical deliverability, structure, and reliability of the customer's shipping address.

CRITICAL INSTRUCTIONS & ETHICAL SAFETY:
- Evaluate ONLY the address deliverability, structural completeness, postal coherence, and potential keyboard-mash / fake addresses.
- DO NOT under any circumstances make assumptions, judgments, or score deductions based on the customer's name, inferred gender, ethnicity, religion, language, caste, or personal identity.
- Any legitimate Indian residential or commercial address (chawls, villages, society flats, rural postal points, layouts) is completely valid as long as sufficient directional/building cues exist for a courier delivery agent.

INPUT TO EVALUATE:
- Customer Name: ${input.customerName}
- Street / Address: ${input.address}
- House/Flat Number: ${input.houseFlat || "Not provided explicitly"}
- Street/Area: ${input.streetArea || "Not provided explicitly"}
- Landmark: ${input.landmark || "Not provided"}
- City: ${input.city}
- State: ${input.state}
- 6-digit Pincode: ${input.pincode}
- Items ordered: ${input.cartItems.map((i) => `${i.name} (Qty ${i.quantity})`).join(", ")}

SCORE CALCULATION GUIDE (address_score: 0 to 60 points):
- 0 to 15 (GOOD quality): Clear house/flat number, road/society name, valid landmark, standard courier can deliver effortlessly.
- 16 to 35 (MODERATE quality): Missing house number or vague street, but has a recognizable landmark or sector; deliverable with phone verification.
- 36 to 60 (POOR quality): Blatant keyboard smash (e.g. "asdfgh"), random characters, missing both house and street, non-existent or impossible location string.

Return ONLY a valid JSON object matching this schema:
{
  "address_score": number (0 to 60),
  "risk_flags": string[] (e.g. "KEYBOARD_SMASH", "MISSING_HOUSE_NUMBER", "VAGUE_LANDMARK", "INSUFFICIENT_DETAILS"),
  "explanation": "Concise 1-2 sentence merchant-facing audit explaining the score",
  "address_quality": "GOOD" | "MODERATE" | "POOR"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);
    const validated = AiResponseSchema.parse(parsed);

    return {
      address_score: validated.address_score,
      risk_flags: validated.risk_flags,
      explanation: validated.explanation,
      address_quality: validated.address_quality,
      is_fallback: false,
    };
  } catch (error) {
    console.warn("Gemini AI evaluation failed or timed out, invoking deterministic fallback:", error);
    return deterministicAddressFallback(input);
  }
}
