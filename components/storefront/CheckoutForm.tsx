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
      <div className="rounded-xl border border-white/10 bg-surface p-5 sm:p-6 shadow-sm" suppressHydrationWarning>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-greige" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-sm font-semibold text-bone lowercase">shipping & contact information</h3>
              <p className="font-sans text-xs text-greige mt-0.5">Enter delivery destination for real-time risk evaluation</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-greige bg-canvas px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
            SSL 256-Bit
          </span>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5 font-sans">
          {/* Customer Name */}
          <div>
            <label className="block text-xs text-greige mb-1">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-greige/60 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.customerName}
                onChange={(e) => onInputChange("customerName", e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-surface-input border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs text-greige mb-1">
              10-Digit Mobile Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-greige/60 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="tel"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-surface-input border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors font-mono tabular-nums"
              />
            </div>
          </div>

          {/* House / Flat Number */}
          <div>
            <label className="block text-xs text-greige mb-1">
              Flat / House / Premise No.
            </label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 text-greige/60 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="text"
                autoComplete="off"
                suppressHydrationWarning
                value={formData.houseFlat}
                onChange={(e) => onInputChange("houseFlat", e.target.value)}
                placeholder="e.g. Flat 402, Green Glen Layout"
                className="w-full bg-surface-input border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Street / Area */}
          <div>
            <label className="block text-xs text-greige mb-1">
              Street / Area / Colony <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Navigation className="w-3.5 h-3.5 text-greige/60 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.streetArea}
                onChange={(e) => onInputChange("streetArea", e.target.value)}
                placeholder="e.g. Bellandur Outer Ring Road"
                className="w-full bg-surface-input border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-xs text-greige mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              autoComplete="off"
              suppressHydrationWarning
              value={formData.landmark || ""}
              onChange={(e) => onInputChange("landmark", e.target.value)}
              placeholder="e.g. Near EcoSpace Tech Park"
              className="w-full bg-surface-input border border-white/10 rounded-lg px-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors"
            />
          </div>

          {/* 6-digit Pincode */}
          <div>
            <label className="block text-xs text-greige mb-1">
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
              className="w-full bg-surface-input border border-white/10 rounded-lg px-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors font-mono tabular-nums"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs text-greige mb-1">
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
              className="w-full bg-surface-input border border-white/10 rounded-lg px-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-xs text-greige mb-1">
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
              className="w-full bg-surface-input border border-white/10 rounded-lg px-3 py-2 text-xs text-bone placeholder:text-greige/50 focus:border-bone/50 focus:ring-1 focus:ring-bone/20 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="pt-4 border-t border-white/10 font-sans">
          <label className="block text-xs font-semibold text-bone mb-2.5 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-greige" strokeWidth={1.5} />
            <span>Select Payment Method</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            {/* COD Option */}
            <label
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                formData.paymentMethod === "COD"
                  ? "bg-surface-hover border-bone/30 text-bone shadow-sm"
                  : "bg-canvas/60 border-white/10 text-greige hover:text-bone hover:bg-surface-hover/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  suppressHydrationWarning
                  checked={formData.paymentMethod === "COD"}
                  onChange={() => onInputChange("paymentMethod", "COD")}
                  className="accent-[#F5F2E6] w-3.5 h-3.5"
                />
                <div>
                  <div className="text-xs font-medium text-bone flex items-center gap-1.5 font-sans">
                    <Truck className="w-3.5 h-3.5 text-greige" strokeWidth={1.5} />
                    Cash on Delivery (COD)
                  </div>
                  <div className="text-[11px] text-greige">
                    Pay with cash at doorstep upon delivery
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-greige bg-canvas px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                Audited
              </span>
            </label>

            {/* UPI Option */}
            <label
              className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                formData.paymentMethod === "UPI"
                  ? "bg-surface-hover border-bone/30 text-bone shadow-sm"
                  : "bg-canvas/60 border-white/10 text-greige hover:text-bone hover:bg-surface-hover/50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  suppressHydrationWarning
                  checked={formData.paymentMethod === "UPI"}
                  onChange={() => onInputChange("paymentMethod", "UPI")}
                  className="accent-[#F5F2E6] w-3.5 h-3.5"
                />
                <div>
                  <div className="text-xs font-medium text-bone flex items-center gap-1.5 font-sans">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                    Instant UPI / QR Code
                  </div>
                  <div className="text-[11px] text-greige">
                    Google Pay, PhonePe, Paytm or BHIM
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                ₹50 OFF
              </span>
            </label>
          </div>
        </div>

        {/* Order Summary & Place Order Button */}
        <div className="p-4 rounded-xl bg-canvas/70 border border-white/10 space-y-2.5 font-sans">
          <div className="flex justify-between items-center text-xs text-greige">
            <span>Selected Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
            <span className="font-mono tabular-nums text-bone">{formatCurrency(cartValue)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-greige">
            <span>Doorstep Shipping:</span>
            <span className="text-emerald-400 font-mono text-[11px]">FREE (Express Delivery)</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs font-semibold text-bone">Total Payable:</span>
            <span className="text-lg font-bold text-bone font-mono tabular-nums">
              {formatCurrency(cartValue)}
            </span>
          </div>

          <button
            type="submit"
            suppressHydrationWarning
            disabled={isLoading || cart.length === 0}
            className="w-full mt-2 py-3 px-4 rounded-full font-medium text-xs bg-bone text-canvas hover:bg-bone-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <ShieldAlert className="w-4 h-4 text-canvas" strokeWidth={1.5} />
            <span>{isLoading ? "Running Risk Engine..." : `Place Order • ${formatCurrency(cartValue)}`}</span>
            <ArrowRight className="w-3.5 h-3.5 text-canvas" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </form>
  );
};
