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
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
            Featured D2C Electronics
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">Select products to test order evaluation & COD rules</p>
        </div>
        <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-white/10 tabular-nums">
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
              className="group flex flex-col justify-between rounded-lg bg-zinc-900/30 border border-white/[0.08] hover:border-white/20 transition-colors overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-44 bg-zinc-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-zinc-200 flex items-center gap-1 border border-white/10">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" strokeWidth={1.5} />
                  <span className="tabular-nums font-mono">{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-sm text-zinc-100 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-normal mb-1.5 line-clamp-1">
                    {product.tagline}
                  </p>
                  <p className="text-xs text-zinc-500 line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 pt-2.5 border-t border-white/[0.06]">
                    <span className="text-sm font-semibold text-zinc-100 font-mono tabular-nums">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      In Stock
                    </span>
                  </div>

                  {/* Add to cart / Quantity controls */}
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2 px-3 rounded-md text-xs font-medium bg-zinc-100 text-zinc-950 hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-zinc-900 border border-white/10 rounded-md p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 rounded bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                      <span className="text-xs font-mono font-medium text-zinc-200 tabular-nums">
                        {quantity} in Cart
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 rounded bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" strokeWidth={1.5} />
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
