"use client";

import React from "react";
import { AddressData, CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldAlert,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  User,
  Building,
  Navigation,
  ArrowRight,
  Info,
  CheckCircle,
} from "lucide-react";

interface CheckoutFormProps {
  formData: AddressData;
  cart: CartItem[];
  cartValue: number;
  onInputChange: (field: keyof AddressData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  cart,
  cartValue,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6" autoComplete="off" suppressHydrationWarning>
      <div className="rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl" suppressHydrationWarning>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Shipping & Contact Details</h3>
              <p className="text-xs text-slate-400">Enter delivery destination for real-time risk assessment</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            SSL 256-Bit Encrypted
          </span>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.customerName}
                onChange={(e) => onInputChange("customerName", e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 transition-colors"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              10-Digit Mobile Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 transition-colors font-mono"
              />
            </div>
          </div>

          {/* House / Flat Number */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Flat / House / Premise No.
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                autoComplete="off"
                suppressHydrationWarning
                value={formData.houseFlat}
                onChange={(e) => onInputChange("houseFlat", e.target.value)}
                placeholder="e.g. Flat 402, Green Glen Layout"
                className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 transition-colors"
              />
            </div>
          </div>

          {/* Street / Area */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Street / Area / Colony <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.streetArea}
                onChange={(e) => onInputChange("streetArea", e.target.value)}
                placeholder="e.g. Bellandur Outer Ring Road"
                className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 transition-colors"
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Landmark (Optional)
            </label>
            <input
              type="text"
              autoComplete="off"
              suppressHydrationWarning
              value={formData.landmark || ""}
              onChange={(e) => onInputChange("landmark", e.target.value)}
              placeholder="e.g. Near EcoSpace Tech Park"
              className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 transition-colors"
            />
          </div>

          {/* 6-digit Pincode */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              6-Digit Indian Pincode <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={6}
              autoComplete="off"
              suppressHydrationWarning
              value={formData.pincode}
              onChange={(e) => onInputChange("pincode", e.target.value)}
              placeholder="e.g. 560103"
              className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 transition-colors font-mono"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              City <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              suppressHydrationWarning
              value={formData.city}
              onChange={(e) => onInputChange("city", e.target.value)}
              placeholder="e.g. Bengaluru"
              className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 transition-colors"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              State <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              suppressHydrationWarning
              value={formData.state}
              onChange={(e) => onInputChange("state", e.target.value)}
              placeholder="e.g. Karnataka"
              className="w-full bg-[#080D1B] border border-card-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 transition-colors"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="pt-4 border-t border-card-border">
          <label className="block text-xs font-bold text-white mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            Select Payment Method:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* COD Option */}
            <label
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${formData.paymentMethod === "COD"
                  ? "bg-primary/10 border-primary shadow-cyan-glow"
                  : "bg-[#0b1322] border-card-border hover:bg-white/5"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  suppressHydrationWarning
                  checked={formData.paymentMethod === "COD"}
                  onChange={() => onInputChange("paymentMethod", "COD")}
                  className="accent-primary w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-primary" />
                    Cash on Delivery (COD)
                  </div>
                  <div className="text-[11px] text-muted">
                    Pay with cash at doorstep upon delivery
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                AI Inspected
              </span>
            </label>

            {/* UPI Option */}
            <label
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${formData.paymentMethod === "UPI"
                  ? "bg-primary/10 border-primary shadow-cyan-glow"
                  : "bg-[#0b1322] border-card-border hover:bg-white/5"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  suppressHydrationWarning
                  checked={formData.paymentMethod === "UPI"}
                  onChange={() => onInputChange("paymentMethod", "UPI")}
                  className="accent-primary w-4 h-4"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    Instant UPI / QR Code
                  </div>
                  <div className="text-[11px] text-muted">
                    Google Pay, PhonePe, Paytm or BHIM
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                ₹50 OFF Promo
              </span>
            </label>
          </div>
        </div>

        {/* Order Summary & Place Order Button */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Selected Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
            <span className="font-mono text-white">{formatCurrency(cartValue)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Doorstep Shipping:</span>
            <span className="text-emerald-400 font-semibold">FREE (Express Dispatch)</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-sm font-bold text-white">Cart Total:</span>
            <span className="text-xl font-black text-pink-400 font-mono">
              {formatCurrency(cartValue)}
            </span>
          </div>

          <button
            type="submit"
            suppressHydrationWarning
            disabled={isLoading || cart.length === 0}
            className="w-full mt-3 py-3.5 px-6 rounded-full font-bold text-sm bg-white text-black hover:bg-slate-200 transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShieldAlert className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>{isLoading ? "Evaluating Risk Engine..." : `Place Order • ${formatCurrency(cartValue)}`}</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </form>
  );
};
