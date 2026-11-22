# 🛡️ RTO-SHIELD
### AI-Powered Return-to-Origin Prevention Platform for D2C E-Commerce

> **Tagline:** Stop Fake Orders. Save Real Revenue.

[![Next.js 15](https://img.shields.io/badge/Next.js-15_(App_Router)-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Executive Summary & Problem

In Indian Direct-to-Consumer (D2C) e-commerce, **Cash on Delivery (COD)** accounts for over 60% of all orders. However, between **30% to 45% of COD shipments result in Return-to-Origin (RTO)** due to:
1. Fake or impulse orders with non-existent or keyboard-smash addresses.
2. Serial returners who place multiple orders and decline doorstep payment.
3. High-value impulse carts abandoned upon delivery.

**Every single RTO costs the merchant ₹140 to ₹220+ in non-recoverable forward and reverse courier shipping, packaging, and trapped inventory.**

**RTO-Shield** is an autonomous risk engine that intercepts checkout attempts in real-time, calculates a normalized **0–100 risk score** using a hybrid deterministic-and-AI architecture, dynamically disables COD on suspicious orders, and unlocks instant ₹50 UPI prepaid discounts to convert risky shipments into guaranteed, delivered revenue.

---

## ⚡ The 60-Second Hackathon Judge Demo

Follow these steps to test the end-to-end functionality in under 60 seconds:

1. **Open Storefront Simulator**: Visit `/storefront`.
2. **Select "Serial Returner" Persona**: Click on persona card 3 (*Amit Verma, phone `9999988888` - 5 prior RTOs recorded*).
3. **Click "Place Order"**:
   - Observe the 3-step animated AI security assessment:
     1. *"Analyzing customer history..."*
     2. *"Checking address quality..."*
     3. *"Running AI risk assessment..."*
4. **Inspect High-Risk Intervention**:
   - Risk score evaluates to **≥ 75 (HIGH RISK)**.
   - Cash on Delivery is disabled.
   - Dynamic prepaid incentive is displayed: *"COD is temporarily unavailable. Complete using UPI to receive ₹50 OFF."*
5. **Convert to UPI**:
   - Click **"Convert to UPI & Save ₹50"**.
   - Select simulated UPI app (Google Pay / PhonePe) and authorize.
   - Order is confirmed and saved with `final_payment_method: PREPAID_CONVERTED`.
6. **Navigate to Merchant Command Center**:
   - Visit `/dashboard`.
   - See the newly converted order at the top of the **Live Risk Feed**.
   - Notice the **Estimated Shipping Saved** metric increased by **₹180** (avoided reverse transit loss).
7. **Test Dynamic Threshold**:
   - Adjust the **Merchant Risk Intervention Threshold Slider** from 75 to 60 or 85 and apply. Future checkout intervention policies adapt dynamically!
8. **Reset Demo State**:
   - Click **"Reset Demo"** in the top navigation or dashboard header anytime to restore default seed data.

---

## 🧠 Hybrid AI Risk Engine Architecture

RTO-Shield employs a two-tier evaluation engine to ensure 100% operational uptime and zero algorithmic demographic bias:

### Tier 1: Deterministic Rule Engine (0 to 40 points)
- **Customer RTO History**:
  - If `rto_count >= 2`: +35 points.
  - If `rto_count >= 4`: Classified as critical repeat return signal.
  - Trusted profiles (≥5 delivered, 0 RTO) receive negative/zero risk flags.
- **High-Value COD**:
  - Cart value > ₹2,500 with COD payment: +15 points.
- **Indian Postal Pincode Validation**:
  - Must conform to `/^[1-9][0-9]{5}$/`: +20 points if invalid.
- **Structural Address Completeness**:
  - Missing explicit house/flat number or street area: +10 points.
- *Normalized max score: 40 points.*

### Tier 2: Google Gemini AI Address Analysis (0 to 60 points)
- **Input**: Customer name, street, house/flat, landmark, city, state, pincode, cart items.
- **Gemini NLP Inspection**:
  - Analyzes deliverability cues, postal coherence, keyboard smash patterns (e.g., `asdfg`, `qwer`, repetitive characters), and missing premise details.
  - **Ethical Safeguard**: Strict system prompt forbids any deduction or assumption based on name, gender, ethnicity, religion, or language.
  - Structured JSON response validated with **Zod**:
    ```json
    {
      "address_score": 0,
      "risk_flags": ["KEYBOARD_SMASH_DETECTED", "MISSING_HOUSE_NUMBER"],
      "explanation": "Gibberish pattern detected in street text with missing premise number.",
      "address_quality": "POOR"
    }
    ```
- **Deterministic Heuristic Fallback**:
  - If the Gemini API key is missing, invalid, or hits rate limits, an automated fallback heuristic evaluator seamlessly executes so the hackathon live demo never fails.

### Tier 3: Dynamic Checkout Interventions
| Risk Score | Risk Level | Merchant Checkout Policy |
| :--- | :--- | :--- |
| **0 – 39** | `LOW RISK` | All payment methods open (COD + UPI). Standard checkout flow. |
| **40 – 74** | `MEDIUM RISK` | COD remains available. Displays promotional banner: *"Switch to UPI and get ₹50 OFF + Priority Dispatch!"* with one-click address confirmation. |
| **75 – 100** | `HIGH RISK` | **COD Disabled.** Customer is required to pay via UPI with instant ₹50 discount. |

---

## 📊 Database Schema (Supabase PostgreSQL)

The schema is defined in `supabase/schema.sql` and seeded in `supabase/seed.sql`:

### 1. `customer_history`
```sql
CREATE TABLE customer_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL UNIQUE,
    customer_name TEXT,
    delivered_count INTEGER NOT NULL DEFAULT 0,
    rto_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 2. `orders`
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    pincode TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    cart_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    cart_value NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    initial_payment_method TEXT NOT NULL,
    risk_score INTEGER NOT NULL,
    risk_level TEXT NOT NULL,
    ai_reasons JSONB NOT NULL DEFAULT '{}'::jsonb,
    intervention_triggered BOOLEAN NOT NULL DEFAULT false,
    final_payment_method TEXT NOT NULL,
    order_status TEXT NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### 3. `merchant_settings`
```sql
CREATE TABLE merchant_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    high_risk_threshold INTEGER NOT NULL DEFAULT 75,
    medium_risk_threshold INTEGER NOT NULL DEFAULT 40,
    cod_fee_discount NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
    estimated_rto_cost NUMERIC(10, 2) NOT NULL DEFAULT 180.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

---

## 🛠️ Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the environment variables:

```ini
# Supabase PostgreSQL & API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key

# Google Gemini API Key (Get free from https://aistudio.google.com/)
GEMINI_API_KEY=your-gemini-api-key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note on Zero Setup Demo**: If Supabase or Gemini keys are omitted, RTO-Shield automatically utilizes an in-memory/file-persisted mock store and the deterministic fallback address analyzer. All features (checkout, evaluation, UPI simulation, database feed, KPIs, charts, threshold sliders, and demo reset) work 100% out-of-the-box!

---

## 🚀 Local Development Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Run Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Vercel Deployment Instructions

1. Push this repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New Project** and import the repository.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
4. Click **Deploy**. Vercel will automatically build the Next.js 15 App Router project.

---

## 🛡️ Completed Features

- [x] **Storefront Simulator**: 4 electronics products, functional cart, quantity controls, address form, and payment selection.
- [x] **⚡ Live Persona System**: 1-click test scenarios (Legitimate Buyer, Suspicious Address, Serial Returner, High-Value COD).
- [x] **Hybrid AI Risk Engine**: 0-40 rule engine + 0-60 Gemini AI address NLP + deterministic fallback.
- [x] **Dynamic Interventions**: Low (clean), Medium (₹50 discount banner + address confirm), High (COD disabled + mandatory UPI incentive).
- [x] **Simulated UPI Gateway**: GPay, PhonePe, Paytm, BHIM simulation with instant settlement (never fake real-money).
- [x] **Merchant Command Center**: Real-time KPI cards (Analyzed, Converted, High Risk, Estimated ₹180 Saved).
- [x] **Recharts Visualizations**: Risk Distribution (Pie), Payment Conversion (Bar), Telemetry Trend (Area).
- [x] **Live Risk Feed Table**: Search, filter by risk level, expandable AI reasoning audit rows.
- [x] **Interactive Threshold Slider**: Adjusts merchant policy dynamically from 50 to 95.
- [x] **Safe Demo Reset**: 1-click reset button restores initial baseline data.
- [x] **Production Ready**: Verified Next.js 15 build, TypeScript type safety, responsive modern cybersecurity UI.
