export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type PaymentMethod = 'COD' | 'UPI' | 'PREPAID_CONVERTED' | 'BLOCKED';

export type OrderStatus = 'CONFIRMED' | 'BLOCKED' | 'FLAGGED';

export interface Product {
  id: string;
  name: string;
  price: number;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CustomerHistory {
  id: string;
  phone: string;
  customer_name?: string;
  delivered_count: number;
  rto_count: number;
  created_at: string;
}

export interface AddressData {
  customerName: string;
  phone: string;
  houseFlat: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'COD' | 'UPI';
}

export interface AiAddressAnalysis {
  address_score: number; // 0 to 60
  risk_flags: string[];
  explanation: string;
  address_quality: 'GOOD' | 'MODERATE' | 'POOR';
  is_fallback?: boolean;
}

export interface RuleBasedAnalysis {
  score: number; // 0 to 40
  flags: string[];
  reasons: string[];
  historyDetails?: {
    delivered_count: number;
    rto_count: number;
    rto_rate_pct: number;
  };
}

export interface RiskEvaluationResult {
  final_score: number; // 0 to 100
  risk_level: RiskLevel;
  rule_score: number;
  ai_score: number;
  detected_flags: string[];
  ai_explanation: string;
  address_quality: 'GOOD' | 'MODERATE' | 'POOR';
  rule_reasons: string[];
  intervention_required: boolean;
  recommended_action: 'ALLOW_COD' | 'OFFER_PREPAID_DISCOUNT' | 'DISABLE_COD';
  evaluated_at: string;
  is_ai_fallback?: boolean;
  threshold_used: number;
}

export interface OrderRecord {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  cart_items: CartItem[];
  cart_value: number;
  initial_payment_method: string;
  risk_score: number;
  risk_level: RiskLevel;
  ai_reasons: {
    address_quality: string;
    address_score: number;
    explanation: string;
    risk_flags: string[];
    rule_reasons: string[];
    is_fallback?: boolean;
  };
  intervention_triggered: boolean;
  final_payment_method: PaymentMethod;
  order_status: OrderStatus;
  created_at: string;
}

export interface MerchantAnalytics {
  kpi: {
    total_orders_analyzed: number;
    prepaid_conversions: number;
    high_risk_orders: number;
    medium_risk_orders: number;
    low_risk_orders: number;
    estimated_shipping_saved: number; // INR
    conversion_rate_pct: number;
    average_risk_score: number;
  };
  charts: {
    risk_distribution: {
      name: string;
      value: number;
      color: string;
    }[];
    payment_conversion: {
      name: string;
      count: number;
      fill: string;
    }[];
    activity_timeline: {
      date: string;
      orders: number;
      high_risk: number;
      conversions: number;
    }[];
  };
  recent_orders: OrderRecord[];
  active_threshold: number;
}

export interface TestPersona {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeVariant: 'low' | 'medium' | 'high';
  customerName: string;
  phone: string;
  houseFlat: string;
  streetArea: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'COD' | 'UPI';
  preselectedProductIndex?: number;
  expectedRisk: RiskLevel;
  scenarioDescription: string;
}
