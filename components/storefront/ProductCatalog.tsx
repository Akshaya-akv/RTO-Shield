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
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
        <div>
          <h2 className="font-display text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-peach" strokeWidth={2} />
            Featured D2C Catalog
          </h2>
          <p className="font-sans text-xs text-twilight-muted mt-0.5">Select products to test order evaluation & COD rules</p>
        </div>
        <span className="text-xs font-mono text-powder bg-powder/20 px-3 py-1 rounded-full border border-powder/40 font-bold tabular-nums">
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
              className="group flex flex-col justify-between rounded-3xl glass-twilight border border-white/15 hover:border-powder/40 transition-all overflow-hidden shadow-glass hover:scale-[1.01]"
            >
              {/* Product Image */}
              <div className="relative w-full h-44 bg-black/40 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1 border border-white/20">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" strokeWidth={2} />
                  <span className="tabular-nums font-mono">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-white line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-peach font-semibold mb-1.5 line-clamp-1">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-twilight-muted line-clamp-2 mb-3 leading-relaxed font-sans">
                    {product.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3.5 pt-3 border-t border-white/10">
                    <span className="text-base font-extrabold text-white font-mono tabular-nums">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                      In Stock
                    </span>
                  </div>

                  {/* Add to cart / Quantity controls */}
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2.5 px-4 rounded-full text-xs font-bold bg-peach hover:bg-peach-light text-lavender-dark transition-all flex items-center justify-center gap-1.5 font-sans shadow-peach-sm active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-lavender-dark" strokeWidth={2} />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-full p-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-full bg-twilight-btn text-white flex items-center justify-center hover:bg-twilight-btn-hover transition-colors shadow-sm"
                      >
                        <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                      <span className="text-xs font-mono font-bold text-white tabular-nums">
                        {quantity} in Cart
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-full bg-twilight-btn text-white flex items-center justify-center hover:bg-twilight-btn-hover transition-colors shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
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
