"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PersonaBar } from "@/components/storefront/PersonaBar";
import { ProductCatalog } from "@/components/storefront/ProductCatalog";
import { CheckoutForm } from "@/components/storefront/CheckoutForm";
import { RiskEvaluationModal } from "@/components/risk/RiskEvaluationModal";
import { SimulatedUpiModal } from "@/components/checkout/SimulatedUpiModal";
import { OrderSuccessModal } from "@/components/checkout/OrderSuccessModal";
import { SAMPLE_PRODUCTS } from "@/components/storefront/catalogData";
import {
  AddressData,
  CartItem,
  OrderRecord,
  Product,
  RiskEvaluationResult,
  TestPersona,
} from "@/types";
import { toast } from "sonner";

export default function StorefrontPage() {
  // Cart state: start with 1 item by default (Wireless Earbuds)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: SAMPLE_PRODUCTS[0].id,
      name: SAMPLE_PRODUCTS[0].name,
      price: SAMPLE_PRODUCTS[0].price,
      quantity: 1,
      image: SAMPLE_PRODUCTS[0].image,
    },
  ]);

  // Form State
  const [formData, setFormData] = useState<AddressData>({
    customerName: "Rahul Sharma",
    phone: "9876543210",
    houseFlat: "Flat 402, Green Glen Layout",
    streetArea: "Bellandur Outer Ring Road",
    landmark: "Near EcoSpace Tech Park",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560103",
    paymentMethod: "COD",
  });

  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>("persona-legit");

  // Evaluation & Modals
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationStep, setEvaluationStep] = useState(1);
  const [evaluationResult, setEvaluationResult] = useState<RiskEvaluationResult | null>(null);

  // UPI Simulation & Success Modals
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  // Cart operations
  const cartValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
      );
    }
  };

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Persona Selection - Auto-fills form and cart configuration
  const handleSelectPersona = (persona: TestPersona) => {
    setSelectedPersonaId(persona.id);
    setFormData({
      customerName: persona.customerName,
      phone: persona.phone,
      houseFlat: persona.houseFlat,
      streetArea: persona.streetArea,
      landmark: persona.landmark,
      city: persona.city,
      state: persona.state,
      pincode: persona.pincode,
      paymentMethod: persona.paymentMethod,
    });

    // For Suspicious Address scenario, bundle to match Slide 1 (₹3,499 COD)
    if (persona.id === "persona-suspicious-address") {
      setCart([
        {
          id: SAMPLE_PRODUCTS[1].id,
          name: SAMPLE_PRODUCTS[1].name,
          price: 2499,
          quantity: 1,
          image: SAMPLE_PRODUCTS[1].image,
        },
        {
          id: "prod-cable-addon",
          name: "Fast-Charging Braided Cable Pack",
          price: 1000,
          quantity: 1,
          image: SAMPLE_PRODUCTS[3].image,
        },
      ]);
    } else if (persona.id === "persona-high-value-cod") {
      setCart([
        {
          id: SAMPLE_PRODUCTS[1].id,
          name: SAMPLE_PRODUCTS[1].name,
          price: SAMPLE_PRODUCTS[1].price,
          quantity: 1,
          image: SAMPLE_PRODUCTS[1].image,
        },
        {
          id: SAMPLE_PRODUCTS[3].id,
          name: SAMPLE_PRODUCTS[3].name,
          price: SAMPLE_PRODUCTS[3].price,
          quantity: 1,
          image: SAMPLE_PRODUCTS[3].image,
        },
      ]);
    } else {
      const targetIdx = persona.preselectedProductIndex ?? 0;
      setCart([
        {
          id: SAMPLE_PRODUCTS[targetIdx].id,
          name: SAMPLE_PRODUCTS[targetIdx].name,
          price: SAMPLE_PRODUCTS[targetIdx].price,
          quantity: 1,
          image: SAMPLE_PRODUCTS[targetIdx].image,
        },
      ]);
    }

    toast.info(`Populated scenario: ${persona.title}`);
  };

  // Place Order -> Trigger Risk Engine Evaluation
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add at least one product.");
      return;
    }

    setIsEvaluationOpen(true);
    setIsEvaluating(true);
    setEvaluationStep(1);

    // Multi-phase inspection timing for polished live demo experience
    const timer1 = setTimeout(() => setEvaluationStep(2), 600);
    const timer2 = setTimeout(() => setEvaluationStep(3), 1300);

    try {
      const res = await fetch("/api/evaluate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cartItems: cart,
          cartValue,
        }),
      });

      const data: RiskEvaluationResult = await res.json();

      setTimeout(() => {
        setIsEvaluating(false);
        setEvaluationResult(data);
      }, 1800);
    } catch (err) {
      console.error(err);
      toast.error("Risk evaluation request failed");
      setIsEvaluating(false);
      setIsEvaluationOpen(false);
    }
  };

  // Save Order to Supabase/store helper
  const persistOrder = async (
    finalPaymentMethod: "COD" | "PREPAID_CONVERTED" | "BLOCKED" | "UPI",
    orderStatus: "CONFIRMED" | "BLOCKED" = "CONFIRMED"
  ) => {
    if (!evaluationResult) return null;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          address: [formData.houseFlat, formData.streetArea, formData.landmark].filter(Boolean).join(", "),
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
          cartItems: cart,
          cartValue,
          initialPaymentMethod: formData.paymentMethod,
          riskScore: evaluationResult.final_score,
          riskLevel: evaluationResult.risk_level,
          aiReasons: {
            address_quality: evaluationResult.address_quality,
            address_score: evaluationResult.ai_score,
            explanation: evaluationResult.ai_explanation,
            risk_flags: evaluationResult.detected_flags,
            rule_reasons: evaluationResult.rule_reasons,
            is_fallback: evaluationResult.is_ai_fallback,
          },
          interventionTriggered: evaluationResult.intervention_required,
          finalPaymentMethod,
          orderStatus,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setConfirmedOrder(data.order);
        return data.order;
      }
    } catch (err) {
      console.error("Failed to persist order:", err);
      toast.error("Failed to record order outcome");
    }
    return null;
  };

  // Flow A: Proceed with standard COD
  const handleProceedCod = async () => {
    setIsEvaluationOpen(false);
    const order = await persistOrder("COD", "CONFIRMED");
    if (order) {
      setIsSuccessModalOpen(true);
      toast.success("Order confirmed via Cash on Delivery!");
    }
  };

  // Flow B: Switch to UPI (Opens Simulated UPI Modal)
  const handleOpenUpiModal = () => {
    setIsEvaluationOpen(false);
    setIsUpiModalOpen(true);
  };

  // Flow C: Complete Simulated UPI Payment
  const handleUpiSuccess = async () => {
    setIsUpiModalOpen(false);
    const order = await persistOrder("PREPAID_CONVERTED", "CONFIRMED");
    if (order) {
      setIsSuccessModalOpen(true);
      toast.success("Prepaid payment completed! ₹180 RTO loss prevented.");
    }
  };

  // Flow D: Abandon / Blocked Order
  const handleCancelBlocked = async () => {
    setIsEvaluationOpen(false);
    await persistOrder("BLOCKED", "BLOCKED");
    toast.info("High-risk order was protected & blocked from COD dispatch.");
  };

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Scenario Persona Selector */}
        <PersonaBar
          selectedPersonaId={selectedPersonaId}
          onSelectPersona={handleSelectPersona}
        />

        {/* Product Catalog */}
        <div className="mb-10">
          <ProductCatalog
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>

        {/* Checkout Form */}
        <div className="max-w-3xl mx-auto">
          <CheckoutForm
            formData={formData}
            cart={cart}
            cartValue={cartValue}
            onInputChange={handleInputChange}
            onSubmit={handleCheckoutSubmit}
            isLoading={isEvaluating}
          />
        </div>
      </main>

      {/* Modals */}
      <RiskEvaluationModal
        isOpen={isEvaluationOpen}
        isEvaluating={isEvaluating}
        evaluationStep={evaluationStep}
        result={evaluationResult}
        formData={formData}
        cartItems={cart}
        cartValue={cartValue}
        onProceedCod={handleProceedCod}
        onOpenUpiModal={handleOpenUpiModal}
        onClose={() => setIsEvaluationOpen(false)}
        onCancelBlocked={handleCancelBlocked}
      />

      <SimulatedUpiModal
        isOpen={isUpiModalOpen}
        onClose={() => setIsUpiModalOpen(false)}
        onSuccess={handleUpiSuccess}
        cartValue={cartValue}
        discount={50}
        customerName={formData.customerName}
      />

      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        order={confirmedOrder}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}
