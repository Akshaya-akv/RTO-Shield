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
      <div className="rounded-lg border border-white/[0.08] bg-zinc-900/30 p-5 sm:p-6" suppressHydrationWarning>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Shipping & Contact Information</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Enter delivery destination for real-time risk evaluation</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-white/[0.06]">
            SSL 256-Bit
          </span>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
          {/* Customer Name */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.customerName}
                onChange={(e) => onInputChange("customerName", e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-zinc-950 border border-white/10 rounded-md pl-8 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
              10-Digit Mobile Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="tel"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.phone}
                onChange={(e) => onInputChange("phone", e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-zinc-950 border border-white/10 rounded-md pl-8 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors font-mono tabular-nums"
              />
            </div>
          </div>

          {/* House / Flat Number */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
              Flat / House / Premise No.
            </label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="text"
                autoComplete="off"
                suppressHydrationWarning
                value={formData.houseFlat}
                onChange={(e) => onInputChange("houseFlat", e.target.value)}
                placeholder="e.g. Flat 402, Green Glen Layout"
                className="w-full bg-zinc-950 border border-white/10 rounded-md pl-8 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Street / Area */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
              Street / Area / Colony <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Navigation className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" strokeWidth={1.5} />
              <input
                type="text"
                required
                autoComplete="off"
                suppressHydrationWarning
                value={formData.streetArea}
                onChange={(e) => onInputChange("streetArea", e.target.value)}
                placeholder="e.g. Bellandur Outer Ring Road"
                className="w-full bg-zinc-950 border border-white/10 rounded-md pl-8 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              autoComplete="off"
              suppressHydrationWarning
              value={formData.landmark || ""}
              onChange={(e) => onInputChange("landmark", e.target.value)}
              placeholder="e.g. Near EcoSpace Tech Park"
              className="w-full bg-zinc-950 border border-white/10 rounded-md px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors"
            />
          </div>

          {/* 6-digit Pincode */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
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
              className="w-full bg-zinc-950 border border-white/10 rounded-md px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors font-mono tabular-nums"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
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
              className="w-full bg-zinc-950 border border-white/10 rounded-md px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1">
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
              className="w-full bg-zinc-950 border border-white/10 rounded-md px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="pt-4 border-t border-white/[0.06]">
          <label className="block text-xs font-semibold text-zinc-200 mb-2.5 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
            <span>Select Payment Method</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
            {/* COD Option */}
            <label
              className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                formData.paymentMethod === "COD"
                  ? "bg-zinc-800/80 border-white/30 text-zinc-100"
                  : "bg-zinc-950/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
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
                  className="accent-zinc-200 w-3.5 h-3.5"
                />
                <div>
                  <div className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
                    Cash on Delivery (COD)
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Pay with cash at doorstep upon delivery
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-white/[0.06]">
                Audited
              </span>
            </label>

            {/* UPI Option */}
            <label
              className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-colors ${
                formData.paymentMethod === "UPI"
                  ? "bg-zinc-800/80 border-white/30 text-zinc-100"
                  : "bg-zinc-950/40 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
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
                  className="accent-zinc-200 w-3.5 h-3.5"
                />
                <div>
                  <div className="text-xs font-medium text-zinc-200 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                    Instant UPI / QR Code
                  </div>
                  <div className="text-[11px] text-zinc-500">
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
        <div className="p-4 rounded-md bg-zinc-950/60 border border-white/[0.06] space-y-2.5">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>Selected Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
            <span className="font-mono tabular-nums text-zinc-200">{formatCurrency(cartValue)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>Doorstep Shipping:</span>
            <span className="text-emerald-400 font-mono text-[11px]">FREE (Express Delivery)</span>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center">
            <span className="text-xs font-semibold text-zinc-200">Total Payable:</span>
            <span className="text-lg font-bold text-zinc-100 font-mono tabular-nums">
              {formatCurrency(cartValue)}
            </span>
          </div>

          <button
            type="submit"
            suppressHydrationWarning
            disabled={isLoading || cart.length === 0}
            className="w-full mt-2 py-2.5 px-4 rounded-md font-medium text-xs bg-zinc-100 text-zinc-950 hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShieldAlert className="w-4 h-4 text-zinc-950" strokeWidth={1.5} />
            <span>{isLoading ? "Running Risk Engine..." : `Place Order • ${formatCurrency(cartValue)}`}</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-950" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </form>
  );
};
