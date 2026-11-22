import { z } from "zod";

export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
});

export const EvaluateRiskRequestSchema = z.object({
  customerName: z.string().min(1, "Customer name is required").max(100),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  houseFlat: z.string().max(150).optional().default(""),
  streetArea: z.string().max(250).optional().default(""),
  landmark: z.string().max(200).optional().default(""),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "State is required").max(100),
  pincode: z.string().min(6, "Pincode is required").max(10),
  paymentMethod: z.enum(["COD", "UPI"]),
  cartItems: z.array(CartItemSchema).min(1, "Cart cannot be empty"),
  cartValue: z.number().nonnegative(),
});

export const SaveOrderRequestSchema = z.object({
  customerName: z.string().min(1),
  phone: z.string().min(10),
  address: z.string().min(1),
  pincode: z.string().min(6),
  city: z.string().min(1),
  state: z.string().min(1),
  cartItems: z.array(CartItemSchema).min(1),
  cartValue: z.number().nonnegative(),
  initialPaymentMethod: z.string(),
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
  aiReasons: z.record(z.any()),
  interventionTriggered: z.boolean(),
  finalPaymentMethod: z.enum(["COD", "UPI", "PREPAID_CONVERTED", "BLOCKED"]),
  orderStatus: z.enum(["CONFIRMED", "BLOCKED", "FLAGGED"]),
});

export const UpdateSettingsRequestSchema = z.object({
  highRiskThreshold: z.number().min(50).max(95),
  mediumRiskThreshold: z.number().min(20).max(60).optional(),
});
