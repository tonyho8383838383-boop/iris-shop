'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ChevronLeft, Plus, Minus, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockProducts } from '@/lib/mockData'
import { useCart } from '@/context/CartContext'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()

  const product = mockProducts.find(p => p.id === params.id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSpec, setSelectedSpec] = useState<string | undefined>(
    product?.specs?.[0]
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-400">
        <p className="text-4xl mb-3">😢</p>
        <p className="text-lg font-medium">找不到此商品</p>
        <Link href="/products" className="text-orange-600 hover:underline mt-2 inline-block">
          回到商品列表
        </Link>
      </div>
    )
  }

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSpec)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSpec)
    router.push('/cart')
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id && p.is_active)
    .slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-4 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        返回
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
            <Image
              src={product.images[selectedImage] || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {discount && (
              <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500 text-white">
                -{discount}%
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit text-orange-600 border-orange-200 mb-3">
            {product.category}
          </Badge>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{product.name}</h1>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-orange-600">NT${product.price}</span>
            {product.original_price && (
              <span className="text-gray-400 line-through text-lg">NT${product.original_price}</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Package className="w-4 h-4" />
            <span>庫存：{product.stock > 0 ? `${product.stock} 件` : '已售完'}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>

          {/* Specs */}
          {product.specs && product.specs.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-medium text-gray-700 mb-2">規格選擇</p>
              <div className="flex flex-wrap gap-2">
                {product.specs.map(spec => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpec(spec)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      selectedSpec === spec
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-orange-300'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">數量</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-400">小計：NT${product.price * quantity}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-all ${
                added
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-orange-500 text-orange-600 hover:bg-orange-50'
              } disabled:border-gray-200 disabled:text-gray-400`}
            >
              <ShoppingCart className="w-5 h-5" />
              {added ? '已加入！' : '加入購物車'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-medium transition-colors"
            >
              立即購買
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4">相關商品</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <Link href={`/products/${p.id}`}>
                  <div className="relative aspect-square bg-gray-50">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{p.name}</p>
                    <p className="text-orange-600 font-bold text-sm mt-1">NT${p.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
