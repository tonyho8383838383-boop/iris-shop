'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/products/ProductCard'
import { mockProducts } from '@/lib/mockData'
import { Category } from '@/types'

const CATEGORIES: (Category | '全部')[] = ['全部', '瘦身必瘦專區', '全民健康專區', '生活百貨', '限時優惠活動', '萌寵樂園', '里民福利特區']

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get('category') as Category) || '全部'

  const [selectedCategory, setSelectedCategory] = useState<Category | '全部'>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return mockProducts.filter(p => {
      if (!p.is_active) return false
      if (selectedCategory !== '全部' && p.category !== selectedCategory) return false
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">全部商品</h1>
        <p className="text-sm text-gray-500">共 {filtered.length} 件商品</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="搜尋商品名稱..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-9 bg-white"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">找不到符合的商品</p>
          <p className="text-sm mt-1">請嘗試其他關鍵字或分類</p>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" /></div>}>
      <ProductsContent />
    </Suspense>
  )
}
