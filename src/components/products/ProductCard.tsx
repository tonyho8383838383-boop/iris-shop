'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white text-xs">
              -{discount}%
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">已售完</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-orange-600 font-bold text-base">NT${product.price}</span>
            {product.original_price && (
              <span className="text-gray-400 text-xs line-through ml-1">NT${product.original_price}</span>
            )}
          </div>
          <button
            onClick={() => product.stock > 0 && addItem(product, 1)}
            disabled={product.stock === 0}
            className="p-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-full transition-colors"
            aria-label="加入購物車"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
