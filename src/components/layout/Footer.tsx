import Link from 'next/link'
import { Store, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-orange-600 mb-3">
              <Store className="w-5 h-5" />
              <span>Iris好物專屬購物區</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              精選生活好物，讓每一天都更美好。<br />
              用心挑選，誠信經營。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">商品分類</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/products?category=生活用品" className="hover:text-orange-600">生活用品</Link></li>
              <li><Link href="/products?category=美容美妝" className="hover:text-orange-600">美容美妝</Link></li>
              <li><Link href="/products?category=零食" className="hover:text-orange-600">零食</Link></li>
              <li><Link href="/products?category=保健" className="hover:text-orange-600">保健</Link></li>
              <li><Link href="/products?category=瘦身" className="hover:text-orange-600">瘦身</Link></li>
              <li><Link href="/products?category=寵物" className="hover:text-orange-600">寵物</Link></li>
              <li><Link href="/products?category=親子" className="hover:text-orange-600">親子</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">聯絡我們</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>LINE：（請洽詢）</li>
              <li>
                <Link href="/admin" className="hover:text-orange-600">後台管理</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
          <span>© 2024 Iris好物專屬購物區. Made with</span>
          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
        </div>
      </div>
    </footer>
  )
}
