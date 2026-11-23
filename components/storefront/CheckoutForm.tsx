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
  ShieldCheck,
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
      <div className="rounded-3xl glass-twilight border border-white/12 p-6 sm:p-7 shadow-glass" suppressHydrationWarning>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-powder/15 border border-powder/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-powder" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white tracking-tight">Shipping & Contact Destination</h3>
              <p className="font-sans text-xs text-twilight-muted mt-0.5">Enter delivery destination for real-time risk evaluation</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-powder bg-powder/10 px-2.5 py-1 rounded-full border border-powder/20 uppercase tracking-wider">
            SSL 256-Bit Secure
          </span>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 font-sans">
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-twilight-muted/70 absolute left-3.5 top-3" strokeWidth={1.8} />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.customerName}
                onChange={(e) => onInputChange("customerName", e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
              10-Digit Mobile Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-twilight-muted/70 absolute left-3.5 top-3" strokeWidth={1.8} />
              <input
                type="tel"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors font-mono tabular-nums"
              />
            </div>
          </div>

          {/* House / Flat Number */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
              Flat / House / Premise No.
            </label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 text-twilight-muted/70 absolute left-3.5 top-3" strokeWidth={1.8} />
              <input
                type="text"
                autoComplete="off"
                suppressHydrationWarning
                value={formData.houseFlat}
                onChange={(e) => onInputChange("houseFlat", e.target.value)}
                placeholder="e.g. Flat 402, Green Glen Layout"
                className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Street / Area */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
              Street / Area / Colony <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Navigation className="w-3.5 h-3.5 text-twilight-muted/70 absolute left-3.5 top-3" strokeWidth={1.8} />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.streetArea}
                onChange={(e) => onInputChange("streetArea", e.target.value)}
                placeholder="e.g. Bellandur Outer Ring Road"
                className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
              Landmark (Optional)
            </label>
            <input
              type="text"
              autoComplete="off"
              suppressHydrationWarning
              value={formData.landmark || ""}
              onChange={(e) => onInputChange("landmark", e.target.value)}
              placeholder="e.g. Near EcoSpace Tech Park"
              className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors"
            />
          </div>

          {/* 6-digit Pincode */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
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
              className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors font-mono tabular-nums"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
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
              className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-medium text-twilight-muted mb-1.5">
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
              className="w-full bg-[#11142B]/70 border border-white/15 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder:text-twilight-muted/50 focus:border-powder focus:ring-1 focus:ring-powder/30 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="pt-5 border-t border-white/10 font-sans">
          <label className="block text-xs font-bold text-white mb-3 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-powder" strokeWidth={1.8} />
            <span>Select Payment Method</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* COD Option */}
            <label
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                formData.paymentMethod === "COD"
                  ? "bg-white/15 border-powder text-white shadow-sm ring-1 ring-powder/40"
                  : "bg-[#11142B]/50 border-white/10 text-twilight-muted hover:text-white hover:bg-white/10"
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
                  className="accent-[#F5B69E] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                    <Truck className="w-3.5 h-3.5 text-twilight-muted" strokeWidth={1.8} />
                    Cash on Delivery (COD)
                  </div>
                  <div className="text-[11px] text-twilight-muted">
                    Pay with cash at doorstep upon delivery
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-powder bg-powder/10 px-2 py-0.5 rounded-full border border-powder/20 uppercase tracking-wider">
                Audited
              </span>
            </label>

            {/* UPI Option */}
            <label
              className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                formData.paymentMethod === "UPI"
                  ? "bg-white/15 border-powder text-white shadow-sm ring-1 ring-powder/40"
                  : "bg-[#11142B]/50 border-white/10 text-twilight-muted hover:text-white hover:bg-white/10"
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
                  className="accent-[#F5B69E] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.8} />
                    Instant UPI / QR Code
                  </div>
                  <div className="text-[11px] text-twilight-muted">
                    Google Pay, PhonePe, Paytm or BHIM
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                ₹50 OFF
              </span>
            </label>
          </div>
        </div>

        {/* Order Summary & Place Order Button */}
        <div className="p-5 rounded-2xl bg-[#11142B]/80 border border-white/12 space-y-3 font-sans">
          <div className="flex justify-between items-center text-xs text-twilight-muted">
            <span>Selected Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
            <span className="font-mono tabular-nums text-white font-semibold">{formatCurrency(cartValue)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-twilight-muted">
            <span>Doorstep Shipping:</span>
            <span className="text-emerald-400 font-mono text-[11px] font-medium">FREE (Express Delivery)</span>
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs font-bold text-white">Total Payable:</span>
            <span className="text-xl font-bold text-white font-mono tabular-nums">
              {formatCurrency(cartValue)}
            </span>
          </div>

          <button
            type="submit"
            suppressHydrationWarning
            disabled={isLoading || cart.length === 0}
            className="w-full mt-3 py-3.5 px-6 rounded-full font-bold text-xs bg-peach hover:bg-peach-light text-lavender-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-peach-sm"
          >
            {isLoading ? (
              <span className="font-mono">Evaluating Delivery Risk...</span>
            ) : (
              <>
                <span>Place Order with Delivery Protection</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
