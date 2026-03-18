'use client'

import Link from 'next/link'
import { ShoppingCart, Store, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function Header() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-600">
          <Store className="w-6 h-6" />
          <span>Iris好物專屬購物區</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition-colors">首頁</Link>
          <Link href="/products" className="hover:text-orange-600 transition-colors">全部商品</Link>
          <Link href="/products?category=瘦身必瘦專區" className="hover:text-orange-600 transition-colors">瘦身必瘦</Link>
          <Link href="/products?category=全民健康專區" className="hover:text-orange-600 transition-colors">全民健康</Link>
          <Link href="/products?category=生活百貨" className="hover:text-orange-600 transition-colors">生活百貨</Link>
          <Link href="/products?category=限時優惠活動" className="hover:text-orange-600 transition-colors">限時優惠</Link>
          <Link href="/products?category=萌寵樂園" className="hover:text-orange-600 transition-colors">萌寵樂園</Link>
          <Link href="/products?category=里民福利特區" className="hover:text-orange-600 transition-colors">里民福利</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2 hover:bg-orange-50 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden p-2 hover:bg-orange-50 rounded-full transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">首頁</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">全部商品</Link>
          <Link href="/products?category=瘦身必瘦專區" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">瘦身必瘦專區</Link>
          <Link href="/products?category=全民健康專區" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">全民健康專區</Link>
          <Link href="/products?category=生活百貨" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">生活百貨</Link>
          <Link href="/products?category=限時優惠活動" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">限時優惠活動</Link>
          <Link href="/products?category=萌寵樂園" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">萌寵樂園</Link>
          <Link href="/products?category=里民福利特區" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">里民福利特區</Link>
        </div>
      )}
    </header>
  )
}
