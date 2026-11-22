import {
  AddressData,
  CartItem,
  CustomerHistory,
  RiskEvaluationResult,
  RiskLevel,
  RuleBasedAnalysis,
} from "@/types";
import { analyzeAddressWithGemini } from "../gemini/client";
import { getCustomerHistoryByPhone, getActiveRiskThreshold } from "../supabase/server";

/**
 * Calculates the rule-based risk score (0 to 40 points).
 * Evaluates past customer delivery history, cart thresholds, pincode validity, and structural elements.
 */
export function calculateRuleBasedScore(
  data: AddressData,
  cartItems: CartItem[],
  cartValue: number,
  history: CustomerHistory | null
): RuleBasedAnalysis {
  let score = 0;
  const flags: string[] = [];
  const reasons: string[] = [];

  // 1. Customer RTO History check (0 to 40 pts)
  if (history) {
    if (history.rto_count >= 4) {
      score += 40;
      flags.push("SERIAL_RETURNER_REPEAT_CRITICAL");
      reasons.push(
        `Critical customer history: ${history.rto_count} prior RTO returns recorded out of ${history.delivered_count + history.rto_count} orders (+40 pts, repeat high-risk signal).`
      );
    } else if (history.rto_count >= 2) {
      score += 35;
      flags.push("PRIOR_RTO_HISTORY");
      reasons.push(
        `History flag: Customer has ${history.rto_count} prior RTO delivery failures (+35 pts).`
      );
    } else if (history.delivered_count >= 5 && history.rto_count === 0) {
      // Good historical customer
      reasons.push(`Trusted customer: ${history.delivered_count} successful deliveries with 0 RTOs.`);
    }
  } else {
    reasons.push("New customer profile: No previous delivery failure records.");
  }

  // 2. High-Value COD check (15 pts)
  if (data.paymentMethod === "COD" && cartValue > 2500) {
    score += 15;
    flags.push("HIGH_VALUE_COD");
    reasons.push(
      `High-Value COD order (₹${cartValue.toLocaleString("en-IN")}) exceeds threshold of ₹2,500 (+15 pts).`
    );
  }

  // 3. Indian Pincode validity check (20 pts)
  // Must be 6 digits, first digit 1-9
  const cleanPincode = data.pincode.replace(/\s+/g, "");
  const isValidIndianPincode = /^[1-9][0-9]{5}$/.test(cleanPincode);
  if (!isValidIndianPincode) {
    score += 20;
    flags.push("INVALID_PINCODE_FORMAT");
    reasons.push(`Pincode "${data.pincode}" is not a valid 6-digit Indian postal code (+20 pts).`);
  }

  // 4. Missing House/Flat number or Street area (10 pts)
  const hasHouse = data.houseFlat && data.houseFlat.trim().length > 0;
  const hasStreet = data.streetArea && data.streetArea.trim().length > 0;
  if (!hasHouse || !hasStreet) {
    score += 10;
    flags.push("INCOMPLETE_ADDRESS_FIELDS");
    reasons.push("Missing explicit house/flat number or street/area specification (+10 pts).");
  }

  // Avoid exceeding 40 points cap for deterministic rules
  const normalizedRuleScore = Math.min(score, 40);

  const historyDetails = history
    ? {
        delivered_count: history.delivered_count,
        rto_count: history.rto_count,
        rto_rate_pct: Math.round(
          (history.rto_count / Math.max(1, history.delivered_count + history.rto_count)) * 100
        ),
      }
    : undefined;

  return {
    score: normalizedRuleScore,
    flags,
    reasons,
    historyDetails,
  };
}

/**
 * Main evaluation pipeline: combines deterministic rules (0-40) with Gemini AI (0-60)
 */
export async function evaluateOrderRisk(
  data: AddressData,
  cartItems: CartItem[],
  cartValue: number,
  customThreshold?: number
): Promise<RiskEvaluationResult> {
  // 1. Fetch Customer History from DB/store
  const history = await getCustomerHistoryByPhone(data.phone);

  // 2. Fetch Active Merchant Threshold
  const activeThreshold = customThreshold ?? (await getActiveRiskThreshold());
  const mediumThreshold = 40;

  // 3. Deterministic Rule-Based Analysis (0 - 40 pts)
  const ruleAnalysis = calculateRuleBasedScore(data, cartItems, cartValue, history);

  // 4. AI Address Analysis via Gemini / Deterministic Fallback (0 - 60 pts)
  const fullAddressString = [data.houseFlat, data.streetArea, data.landmark]
    .filter(Boolean)
    .join(", ");

  const aiAnalysis = await analyzeAddressWithGemini({
    customerName: data.customerName,
    address: fullAddressString,
    houseFlat: data.houseFlat,
    streetArea: data.streetArea,
    landmark: data.landmark,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    cartItems,
  });

  // 5. Final Combined Normalized Score (0 to 100)
  let combinedRawScore = ruleAnalysis.score + aiAnalysis.address_score;

  // Repeat high-risk history signal (4+ prior RTOs attempting COD) sets critical risk baseline
  if (history && history.rto_count >= 4 && data.paymentMethod === "COD") {
    combinedRawScore = Math.max(combinedRawScore, 85);
  }

  const final_score = Math.min(Math.max(combinedRawScore, 0), 100);

  // 6. Dynamic Classification using merchant threshold
  let risk_level: RiskLevel = "LOW";
  let recommended_action: "ALLOW_COD" | "OFFER_PREPAID_DISCOUNT" | "DISABLE_COD" = "ALLOW_COD";
  let intervention_required = false;

  if (final_score >= activeThreshold) {
    risk_level = "HIGH";
    recommended_action = "DISABLE_COD";
    intervention_required = true;
  } else if (final_score >= mediumThreshold) {
    risk_level = "MEDIUM";
    recommended_action = "OFFER_PREPAID_DISCOUNT";
    intervention_required = true;
  } else {
    risk_level = "LOW";
    recommended_action = "ALLOW_COD";
    intervention_required = false;
  }

  // Combine detected flags
  const detected_flags = Array.from(new Set([...ruleAnalysis.flags, ...aiAnalysis.risk_flags]));

  return {
    final_score,
    risk_level,
    rule_score: ruleAnalysis.score,
    ai_score: aiAnalysis.address_score,
    detected_flags,
    ai_explanation: aiAnalysis.explanation,
    address_quality: aiAnalysis.address_quality,
    rule_reasons: ruleAnalysis.reasons,
    intervention_required,
    recommended_action,
    evaluated_at: new Date().toISOString(),
    is_ai_fallback: aiAnalysis.is_fallback,
    threshold_used: activeThreshold,
  };
}
