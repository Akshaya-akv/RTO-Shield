-- RTO-SHIELD DATABASE SEED DATA
-- Fictional phone numbers reserved for testing and initial demo orders

-- Clear existing data
TRUNCATE TABLE orders CASCADE;
DELETE FROM customer_history;

-- 1. SEED CUSTOMER HISTORY PROFILES
INSERT INTO customer_history (id, phone, customer_name, delivered_count, rto_count, created_at)
VALUES
  -- Persona 1: Legitimate Buyer (Excellent track record, 0 RTOs)
  ('a1111111-1111-4111-8111-111111111111', '9876543210', 'Rahul Sharma', 12, 0, NOW() - INTERVAL '45 days'),
  
  -- Persona 2: Occasional Returner (Moderate track record, 2 RTOs)
  ('b2222222-2222-4222-8222-222222222222', '9811122334', 'Vikram Malhotra', 5, 2, NOW() - INTERVAL '30 days'),
  
  -- Persona 3: Serial Returner (High RTO rate, 5 RTOs out of 7 orders)
  ('c3333333-3333-4333-8333-333333333333', '9999988888', 'Amit Verma', 2, 5, NOW() - INTERVAL '60 days');

-- 2. SEED INITIAL REALISTIC ORDERS FOR ANALYTICS DEMO
INSERT INTO orders (
    id, customer_name, phone, address, pincode, city, state,
    cart_items, cart_value, initial_payment_method, risk_score, risk_level,
    ai_reasons, intervention_triggered, final_payment_method, order_status, created_at
)
VALUES
  (
    'd4444444-4444-4444-8444-444444444444',
    'Rahul Sharma',
    '9876543210',
    'Flat 402, Green Glen Layout, Bellandur',
    '560103',
    'Bengaluru',
    'Karnataka',
    '[{"id":"prod-1","name":"Wireless Earbuds","price":1499,"quantity":1}]'::jsonb,
    1499.00,
    'COD',
    15,
    'LOW',
    '{"address_quality":"GOOD","address_score":5,"explanation":"Complete and verified residential delivery address with clean customer history.","risk_flags":[],"rule_reasons":["Clean customer history (12 delivered, 0 RTO)"]}'::jsonb,
    false,
    'COD',
    'CONFIRMED',
    NOW() - INTERVAL '5 hours'
  ),
  (
    'e5555555-5555-4555-8555-555555555555',
    'Sneha Patel',
    '9822334455',
    'B-12, Shanti Niketan, Near Navrangpura Post Office',
    '380009',
    'Ahmedabad',
    'Gujarat',
    '[{"id":"prod-2","name":"Smart Watch","price":2499,"quantity":1}]'::jsonb,
    2499.00,
    'UPI',
    20,
    'LOW',
    '{"address_quality":"GOOD","address_score":10,"explanation":"Prepaid order with well-structured landmark and residential details.","risk_flags":[],"rule_reasons":["Direct UPI Prepaid order - zero financial risk"]}'::jsonb,
    false,
    'UPI',
    'CONFIRMED',
    NOW() - INTERVAL '8 hours'
  ),
  (
    'f6666666-6666-4666-8666-666666666666',
    'Karan Singh',
    '9811122334',
    'H No 78, Sector 14 Urban Estate',
    '122001',
    'Gurugram',
    'Haryana',
    '[{"id":"prod-2","name":"Smart Watch","price":2499,"quantity":1},{"id":"prod-4","name":"Power Bank","price":1299,"quantity":1}]'::jsonb,
    3798.00,
    'COD',
    55,
    'MEDIUM',
    '{"address_quality":"MODERATE","address_score":20,"explanation":"Cart value exceeds ₹2,500 threshold with moderate customer return frequency.","risk_flags":["HIGH_VALUE_COD","HISTORY_MODERATE_RTO"],"rule_reasons":["Customer has 2 prior RTO orders (+35 pts)","High-value COD order over ₹2,500 (+15 pts)"]}'::jsonb,
    true,
    'PREPAID_CONVERTED',
    'CONFIRMED',
    NOW() - INTERVAL '12 hours'
  ),
  (
    '17777777-7777-4777-8777-777777777777',
    'Test Buyer 09',
    '9765432199',
    'near tea stall opp temple main road',
    '110001',
    'New Delhi',
    'Delhi',
    '[{"id":"prod-3","name":"Bluetooth Speaker","price":1999,"quantity":1}]'::jsonb,
    1999.00,
    'COD',
    82,
    'HIGH',
    '{"address_quality":"POOR","address_score":52,"explanation":"Vague unstructured landmark with missing house number and missing street identity.","risk_flags":["MISSING_HOUSE_NUMBER","VAGUE_LANDMARK","POOR_ADDRESS_RELIABILITY"],"rule_reasons":["Missing house/flat number (+10 pts)"]}'::jsonb,
    true,
    'BLOCKED',
    'BLOCKED',
    NOW() - INTERVAL '1 day'
  ),
  (
    '28888888-8888-4888-8888-888888888888',
    'Ananya Sen',
    '9833445566',
    'Flat 3C, Lake View Enclave, Salt Lake Sector 2',
    '700091',
    'Kolkata',
    'West Bengal',
    '[{"id":"prod-1","name":"Wireless Earbuds","price":1499,"quantity":1}]'::jsonb,
    1499.00,
    'COD',
    18,
    'LOW',
    '{"address_quality":"GOOD","address_score":8,"explanation":"Clear residential address with valid postal routing.","risk_flags":[],"rule_reasons":[]}'::jsonb,
    false,
    'COD',
    'CONFIRMED',
    NOW() - INTERVAL '1 day 4 hours'
  ),
  (
    '39999999-9999-4999-8999-999999999999',
    'Rohan Gupta',
    '9999988888',
    'Building 12, Cyber Hub Road',
    '122002',
    'Gurugram',
    'Haryana',
    '[{"id":"prod-3","name":"Bluetooth Speaker","price":1999,"quantity":1},{"id":"prod-4","name":"Power Bank","price":1299,"quantity":1}]'::jsonb,
    3298.00,
    'COD',
    88,
    'HIGH',
    '{"address_quality":"MODERATE","address_score":25,"explanation":"Serial returner with 5 prior RTOs attempting high-value cash on delivery.","risk_flags":["SERIAL_RETURNER","HIGH_VALUE_COD"],"rule_reasons":["Customer has 5 prior RTO orders (+35 pts, repeat high risk)","High-value COD order over ₹2,500 (+15 pts)"]}'::jsonb,
    true,
    'PREPAID_CONVERTED',
    'CONFIRMED',
    NOW() - INTERVAL '2 days'
  );
