'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { mockProducts } from '@/lib/mockData'
import { Category } from '@/types'

const banners = [
  {
    id: 1,
    title: '精選生活好物',
    subtitle: '讓每一天都更美好',
    bg: 'from-orange-400 to-pink-400',
    emoji: '🛍️',
  },
  {
    id: 2,
    title: '美妝保養特輯',
    subtitle: '韓系美妝 限時優惠',
    bg: 'from-pink-400 to-purple-400',
    emoji: '✨',
  },
  {
    id: 3,
    title: '健康保健首選',
    subtitle: '日本進口 品質保證',
    bg: 'from-green-400 to-teal-400',
    emoji: '💊',
  },
]

const categories: { name: Category | '全部'; icon: string; href: string }[] = [
  { name: '瘦身必瘦專區', icon: '🏃', href: '/products?category=瘦身必瘦專區' },
  { name: '全民健康專區', icon: '💊', href: '/products?category=全民健康專區' },
  { name: '生活百貨', icon: '🏠', href: '/products?category=生活百貨' },
  { name: '限時優惠活動', icon: '🔥', href: '/products?category=限時優惠活動' },
  { name: '萌寵樂園', icon: '🐾', href: '/products?category=萌寵樂園' },
  { name: '里民福利特區', icon: '🎁', href: '/products?category=里民福利特區' },
]

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const featuredProducts = mockProducts.filter(p => p.is_active).slice(0, 8)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 md:h-72">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 bg-gradient-to-r ${banner.bg} flex flex-col items-center justify-center text-white transition-opacity duration-700 ${idx === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-5xl mb-3">{banner.emoji}</span>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{banner.title}</h1>
            <p className="text-sm md:text-lg opacity-90">{banner.subtitle}</p>
            <Link
              href="/products"
              className="mt-4 bg-white text-orange-600 font-semibold text-sm px-6 py-2 rounded-full hover:bg-orange-50 transition-colors"
            >
              立即選購
            </Link>
          </div>
        ))}

        <button
          onClick={() => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-1.5 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentBanner(prev => (prev + 1) % banners.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-1.5 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentBanner ? 'bg-white w-5' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">商品分類</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.name}
              href={cat.href}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-gray-100"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            精選商品
          </h2>
          <Link href="/products" className="text-sm text-orange-600 hover:underline font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
