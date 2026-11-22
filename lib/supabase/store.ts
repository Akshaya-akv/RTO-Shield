import { CustomerHistory, OrderRecord } from "@/types";

// Seed data definitions matching supabase/seed.sql
export const INITIAL_CUSTOMER_HISTORY: CustomerHistory[] = [
  {
    id: "a1111111-1111-4111-8111-111111111111",
    phone: "9876543210",
    customer_name: "Rahul Sharma",
    delivered_count: 12,
    rto_count: 0,
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
  },
  {
    id: "b2222222-2222-4222-8222-222222222222",
    phone: "9811122334",
    customer_name: "Vikram Malhotra",
    delivered_count: 5,
    rto_count: 2,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: "c3333333-3333-4333-8333-333333333333",
    phone: "9999988888",
    customer_name: "Amit Verma",
    delivered_count: 2,
    rto_count: 5,
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
];

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "d4444444-4444-4444-8444-444444444444",
    customer_name: "Rahul Sharma",
    phone: "9876543210",
    address: "Flat 402, Green Glen Layout, Bellandur",
    pincode: "560103",
    city: "Bengaluru",
    state: "Karnataka",
    cart_items: [
      { id: "prod-1", name: "Wireless Earbuds", price: 1499, quantity: 1 },
    ],
    cart_value: 1499,
    initial_payment_method: "COD",
    risk_score: 15,
    risk_level: "LOW",
    ai_reasons: {
      address_quality: "GOOD",
      address_score: 5,
      explanation: "Complete and verified residential delivery address with clean customer history.",
      risk_flags: [],
      rule_reasons: ["Clean customer history (12 delivered, 0 RTO)"],
    },
    intervention_triggered: false,
    final_payment_method: "COD",
    order_status: "CONFIRMED",
    created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: "e5555555-5555-4555-8555-555555555555",
    customer_name: "Sneha Patel",
    phone: "9822334455",
    address: "B-12, Shanti Niketan, Near Navrangpura Post Office",
    pincode: "380009",
    city: "Ahmedabad",
    state: "Gujarat",
    cart_items: [
      { id: "prod-2", name: "Smart Watch", price: 2499, quantity: 1 },
    ],
    cart_value: 2499,
    initial_payment_method: "UPI",
    risk_score: 18,
    risk_level: "LOW",
    ai_reasons: {
      address_quality: "GOOD",
      address_score: 10,
      explanation: "Prepaid order with well-structured landmark and residential details.",
      risk_flags: [],
      rule_reasons: ["Direct UPI Prepaid order - zero financial risk"],
    },
    intervention_triggered: false,
    final_payment_method: "UPI",
    order_status: "CONFIRMED",
    created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    id: "f6666666-6666-4666-8666-666666666666",
    customer_name: "Karan Singh",
    phone: "9811122334",
    address: "H No 78, Sector 14 Urban Estate",
    pincode: "122001",
    city: "Gurugram",
    state: "Haryana",
    cart_items: [
      { id: "prod-2", name: "Smart Watch", price: 2499, quantity: 1 },
      { id: "prod-4", name: "Power Bank", price: 1299, quantity: 1 },
    ],
    cart_value: 3798,
    initial_payment_method: "COD",
    risk_score: 55,
    risk_level: "MEDIUM",
    ai_reasons: {
      address_quality: "MODERATE",
      address_score: 20,
      explanation: "Cart value exceeds ₹2,500 threshold with moderate customer return frequency.",
      risk_flags: ["HIGH_VALUE_COD", "HISTORY_MODERATE_RTO"],
      rule_reasons: [
        "Customer has 2 prior RTO orders (+35 pts)",
        "High-value COD order over ₹2,500 (+15 pts)",
      ],
    },
    intervention_triggered: true,
    final_payment_method: "PREPAID_CONVERTED",
    order_status: "CONFIRMED",
    created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
  },
  {
    id: "17777777-7777-4777-8777-777777777777",
    customer_name: "Test Buyer 09",
    phone: "9765432199",
    address: "near tea stall opp temple main road",
    pincode: "110001",
    city: "New Delhi",
    state: "Delhi",
    cart_items: [
      { id: "prod-3", name: "Bluetooth Speaker", price: 1999, quantity: 1 },
    ],
    cart_value: 1999,
    initial_payment_method: "COD",
    risk_score: 82,
    risk_level: "HIGH",
    ai_reasons: {
      address_quality: "POOR",
      address_score: 52,
      explanation: "Vague unstructured landmark with missing house number and missing street identity.",
      risk_flags: ["MISSING_HOUSE_NUMBER", "VAGUE_LANDMARK", "POOR_ADDRESS_RELIABILITY"],
      rule_reasons: ["Missing house/flat number (+10 pts)"],
    },
    intervention_triggered: true,
    final_payment_method: "BLOCKED",
    order_status: "BLOCKED",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "28888888-8888-4888-8888-888888888888",
    customer_name: "Ananya Sen",
    phone: "9833445566",
    address: "Flat 3C, Lake View Enclave, Salt Lake Sector 2",
    pincode: "700091",
    city: "Kolkata",
    state: "West Bengal",
    cart_items: [
      { id: "prod-1", name: "Wireless Earbuds", price: 1499, quantity: 1 },
    ],
    cart_value: 1499,
    initial_payment_method: "COD",
    risk_score: 18,
    risk_level: "LOW",
    ai_reasons: {
      address_quality: "GOOD",
      address_score: 8,
      explanation: "Clear residential address with valid postal routing.",
      risk_flags: [],
      rule_reasons: [],
    },
    intervention_triggered: false,
    final_payment_method: "COD",
    order_status: "CONFIRMED",
    created_at: new Date(Date.now() - 28 * 3600000).toISOString(),
  },
  {
    id: "39999999-9999-4999-8999-999999999999",
    customer_name: "Rohan Gupta",
    phone: "9999988888",
    address: "Building 12, Cyber Hub Road",
    pincode: "122002",
    city: "Gurugram",
    state: "Haryana",
    cart_items: [
      { id: "prod-3", name: "Bluetooth Speaker", price: 1999, quantity: 1 },
      { id: "prod-4", name: "Power Bank", price: 1299, quantity: 1 },
    ],
    cart_value: 3298,
    initial_payment_method: "COD",
    risk_score: 88,
    risk_level: "HIGH",
    ai_reasons: {
      address_quality: "MODERATE",
      address_score: 25,
      explanation: "Serial returner with 5 prior RTOs attempting high-value cash on delivery.",
      risk_flags: ["SERIAL_RETURNER", "HIGH_VALUE_COD"],
      rule_reasons: [
        "Customer has 5 prior RTO orders (+35 pts, repeat high risk)",
        "High-value COD order over ₹2,500 (+15 pts)",
      ],
    },
    intervention_triggered: true,
    final_payment_method: "PREPAID_CONVERTED",
    order_status: "CONFIRMED",
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
  },
];

// In-Memory store singleton for local server instances
class MemoryStore {
  private static instance: MemoryStore;
  private customerHistory: CustomerHistory[] = [];
  private orders: OrderRecord[] = [];
  private highRiskThreshold: number = 75;

  private constructor() {
    this.reset();
  }

  public static getInstance(): MemoryStore {
    if (!MemoryStore.instance) {
      MemoryStore.instance = new MemoryStore();
    }
    return MemoryStore.instance;
  }

  public reset() {
    this.customerHistory = JSON.parse(JSON.stringify(INITIAL_CUSTOMER_HISTORY));
    this.orders = JSON.parse(JSON.stringify(INITIAL_ORDERS));
    this.highRiskThreshold = 75;
  }

  public getCustomerByPhone(phone: string): CustomerHistory | null {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const match = this.customerHistory.find(
      (c) => c.phone.replace(/[^0-9]/g, "") === cleanPhone
    );
    return match || null;
  }

  public getOrders(riskLevel?: string, search?: string): OrderRecord[] {
    let result = [...this.orders].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    if (riskLevel && riskLevel !== "ALL") {
      result = result.filter((o) => o.risk_level === riskLevel);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.customer_name.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.city.toLowerCase().includes(q)
      );
    }

    return result;
  }

  public addOrder(order: OrderRecord): OrderRecord {
    // Check duplicate by phone and timestamp within last 5 seconds
    const existing = this.orders.find(
      (o) =>
        o.phone === order.phone &&
        Math.abs(new Date(o.created_at).getTime() - new Date(order.created_at).getTime()) < 3000
    );
    if (existing) {
      return existing;
    }
    this.orders.unshift(order);
    return order;
  }

  public getHighRiskThreshold(): number {
    return this.highRiskThreshold;
  }

  public setHighRiskThreshold(threshold: number) {
    this.highRiskThreshold = threshold;
  }
}

export const memoryStore = MemoryStore.getInstance();
