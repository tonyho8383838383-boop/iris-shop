'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-600 mb-2">購物車是空的</h2>
        <p className="text-gray-400 mb-6">快去挑選喜歡的商品吧！</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          前往選購
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        購物車
        <span className="text-base font-normal text-gray-400 ml-2">（{items.length} 項商品）</span>
      </h1>

      <div className="space-y-3 mb-6">
        {items.map(item => (
          <div
            key={`${item.product.id}-${item.selectedSpec}`}
            className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 line-clamp-2 text-sm">{item.product.name}</p>
              {item.selectedSpec && (
                <p className="text-xs text-gray-400 mt-0.5">規格：{item.selectedSpec}</p>
              )}
              <p className="text-orange-600 font-bold mt-1">NT${item.product.price}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.product.id, item.selectedSpec)}
                className="p-1 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSpec)}
                  className="p-1.5 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSpec)}
                  className="p-1.5 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>小計</span>
          <span>NT${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>運費</span>
          <span className="text-green-600">免運費</span>
        </div>
        <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
          <span className="font-bold text-gray-800">總計</span>
          <span className="text-2xl font-bold text-orange-600">NT${totalPrice}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium transition-colors"
        >
          前往結帳
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/products"
          className="mt-3 w-full flex items-center justify-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
          繼續購物
        </Link>
      </div>
    </div>
  )
}
