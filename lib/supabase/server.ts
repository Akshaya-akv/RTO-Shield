import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { memoryStore } from "./store";
import { CustomerHistory, OrderRecord } from "@/types";

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !serviceKey || url.includes("your-project-id") || serviceKey.includes("your-service-role")) {
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createClient(url, serviceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    } catch (e) {
      console.warn("Failed to initialize Supabase client, falling back to memory store:", e);
      return null;
    }
  }

  return supabaseClient;
}

export async function getCustomerHistoryByPhone(phone: string): Promise<CustomerHistory | null> {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const client = getSupabaseServer();

  if (client) {
    try {
      const { data, error } = await client
        .from("customer_history")
        .select("*")
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (!error && data) {
        return data as CustomerHistory;
      }
    } catch (err) {
      console.warn("Supabase customer history lookup error, using fallback:", err);
    }
  }

  return memoryStore.getCustomerByPhone(cleanPhone);
}

export async function fetchAllOrders(riskLevel?: string, search?: string): Promise<OrderRecord[]> {
  const client = getSupabaseServer();

  if (client) {
    try {
      let query = client.from("orders").select("*").order("created_at", { ascending: false });

      if (riskLevel && riskLevel !== "ALL") {
        query = query.eq("risk_level", riskLevel);
      }

      if (search) {
        query = query.or(`customer_name.ilike.%${search}%,phone.ilike.%${search}%,city.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as OrderRecord[];
      }
    } catch (err) {
      console.warn("Supabase fetch orders error, using fallback:", err);
    }
  }

  return memoryStore.getOrders(riskLevel, search);
}

export async function insertOrder(order: Omit<OrderRecord, "id" | "created_at"> & { id?: string; created_at?: string }): Promise<OrderRecord> {
  const client = getSupabaseServer();
  const orderRecord: OrderRecord = {
    ...order,
    id: order.id || crypto.randomUUID(),
    created_at: order.created_at || new Date().toISOString(),
  };

  if (client) {
    try {
      const { data, error } = await client.from("orders").insert([orderRecord]).select().single();
      if (!error && data) {
        // Also update memoryStore cache for seamless consistency
        memoryStore.addOrder(data as OrderRecord);
        return data as OrderRecord;
      }
    } catch (err) {
      console.warn("Supabase insert order error, using fallback:", err);
    }
  }

  return memoryStore.addOrder(orderRecord);
}

export async function getActiveRiskThreshold(): Promise<number> {
  const client = getSupabaseServer();

  if (client) {
    try {
      const { data, error } = await client
        .from("merchant_settings")
        .select("high_risk_threshold")
        .eq("id", "default")
        .maybeSingle();

      if (!error && data && data.high_risk_threshold) {
        return data.high_risk_threshold;
      }
    } catch (err) {
      console.warn("Supabase settings lookup error, using fallback:", err);
    }
  }

  return memoryStore.getHighRiskThreshold();
}

export async function updateActiveRiskThreshold(threshold: number): Promise<number> {
  memoryStore.setHighRiskThreshold(threshold);
  const client = getSupabaseServer();

  if (client) {
    try {
      await client
        .from("merchant_settings")
        .upsert({ id: "default", high_risk_threshold: threshold, updated_at: new Date().toISOString() });
    } catch (err) {
      console.warn("Supabase settings update error, relying on local update:", err);
    }
  }

  return threshold;
}

export async function resetDatabaseDemo(): Promise<{ success: boolean; message: string }> {
  memoryStore.reset();
  const client = getSupabaseServer();

  if (client) {
    try {
      // In Supabase, delete all rows from orders and reseed
      await client.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    } catch (err) {
      console.warn("Supabase reset warning:", err);
    }
  }

  return { success: true, message: "Demo data reset successfully to default state" };
}
