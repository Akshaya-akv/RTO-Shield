"use client";

import React from "react";
import Image from "next/image";
import { SAMPLE_PRODUCTS } from "./catalogData";
import { Product, CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Star, Plus, Minus, ShoppingBag, Check } from "lucide-react";

interface ProductCatalogProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-card-border">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Featured D2C Electronics
          </h2>
          <p className="text-xs text-muted">Select products to test order evaluation & COD rules</p>
        </div>
        <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
          {SAMPLE_PRODUCTS.length} Products In Stock
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_PRODUCTS.map((product) => {
          const itemInCart = cart.find((i) => i.id === product.id);
          const quantity = itemInCart?.quantity || 0;

          return (
            <div
              key={product.id}
              className="group flex flex-col justify-between rounded-xl bg-secondary-bg/80 border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-cyan-glow overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    // Fallback to high-reliability tech image if any link is interrupted
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-white flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-primary/80 font-medium mb-1 line-clamp-1">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-muted line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 pt-2 border-t border-white/5">
                    <span className="text-base font-extrabold text-white font-mono">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>

                  {/* Add to cart / Quantity controls */}
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-white hover:bg-primary hover:text-[#080D1B] hover:border-primary transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-primary/10 border border-primary/30 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded bg-[#080D1B] text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-primary font-mono">
                        {quantity} in Cart
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded bg-[#080D1B] text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
