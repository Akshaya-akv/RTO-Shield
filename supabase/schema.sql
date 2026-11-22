-- RTO-SHIELD DATABASE SCHEMA
-- PostgreSQL / Supabase Schema

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customer_history CASCADE;
DROP TABLE IF EXISTS merchant_settings CASCADE;

-- 1. CUSTOMER HISTORY TABLE
-- Tracks previous delivery outcomes to identify serial returners vs legitimate buyers
CREATE TABLE customer_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT NOT NULL UNIQUE,
    customer_name TEXT,
    delivered_count INTEGER NOT NULL DEFAULT 0,
    rto_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant phone number lookups during checkout evaluation
CREATE INDEX idx_customer_history_phone ON customer_history (phone);

-- 2. ORDERS TABLE
-- Stores evaluated orders, risk assessments, interventions and final checkout outcomes
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
    initial_payment_method TEXT NOT NULL, -- 'COD' or 'UPI'
    risk_score INTEGER NOT NULL,          -- 0 to 100
    risk_level TEXT NOT NULL,             -- 'LOW', 'MEDIUM', 'HIGH'
    ai_reasons JSONB NOT NULL DEFAULT '{}'::jsonb,
    intervention_triggered BOOLEAN NOT NULL DEFAULT false,
    final_payment_method TEXT NOT NULL,   -- 'COD', 'PREPAID_CONVERTED', 'BLOCKED', 'UPI'
    order_status TEXT NOT NULL DEFAULT 'CONFIRMED', -- 'CONFIRMED', 'BLOCKED', 'FLAGGED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for dashboard filtering, time-series charts, and search
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX idx_orders_risk_level ON orders (risk_level);
CREATE INDEX idx_orders_final_payment_method ON orders (final_payment_method);
CREATE INDEX idx_orders_phone ON orders (phone);

-- 3. MERCHANT SETTINGS TABLE
-- Stores dynamic merchant configuration such as high-risk threshold
CREATE TABLE merchant_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    high_risk_threshold INTEGER NOT NULL DEFAULT 75,
    medium_risk_threshold INTEGER NOT NULL DEFAULT 40,
    cod_fee_discount NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
    estimated_rto_cost NUMERIC(10, 2) NOT NULL DEFAULT 180.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initial default settings
INSERT INTO merchant_settings (id, high_risk_threshold, medium_risk_threshold, cod_fee_discount, estimated_rto_cost)
VALUES ('default', 75, 40, 50.00, 180.00)
ON CONFLICT (id) DO NOTHING;
