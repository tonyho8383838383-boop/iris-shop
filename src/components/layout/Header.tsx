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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-600 transition-colors">首頁</Link>
          <Link href="/products" className="hover:text-orange-600 transition-colors">全部商品</Link>
          <Link href="/products?category=生活用品" className="hover:text-orange-600 transition-colors">生活用品</Link>
          <Link href="/products?category=美容美妝" className="hover:text-orange-600 transition-colors">美容美妝</Link>
          <Link href="/products?category=零食" className="hover:text-orange-600 transition-colors">零食</Link>
          <Link href="/products?category=保健" className="hover:text-orange-600 transition-colors">保健</Link>
          <Link href="/products?category=瘦身" className="hover:text-orange-600 transition-colors">瘦身</Link>
          <Link href="/products?category=寵物" className="hover:text-orange-600 transition-colors">寵物</Link>
          <Link href="/products?category=親子" className="hover:text-orange-600 transition-colors">親子</Link>
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
          <Link href="/products?category=生活用品" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">生活用品</Link>
          <Link href="/products?category=美容美妝" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">美容美妝</Link>
          <Link href="/products?category=零食" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">零食</Link>
          <Link href="/products?category=保健" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">保健</Link>
          <Link href="/products?category=瘦身" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">瘦身</Link>
          <Link href="/products?category=寵物" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">寵物</Link>
          <Link href="/products?category=親子" onClick={() => setMenuOpen(false)} className="hover:text-orange-600">親子</Link>
        </div>
      )}
    </header>
  )
}
