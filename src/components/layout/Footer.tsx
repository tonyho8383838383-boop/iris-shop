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
              <li><Link href="/products?category=瘦身必瘦專區" className="hover:text-orange-600">瘦身必瘦專區</Link></li>
              <li><Link href="/products?category=全民健康專區" className="hover:text-orange-600">全民健康專區</Link></li>
              <li><Link href="/products?category=生活百貨" className="hover:text-orange-600">生活百貨</Link></li>
              <li><Link href="/products?category=限時優惠活動" className="hover:text-orange-600">限時優惠活動</Link></li>
              <li><Link href="/products?category=萌寵樂園" className="hover:text-orange-600">萌寵樂園</Link></li>
              <li><Link href="/products?category=里民福利特區" className="hover:text-orange-600">里民福利特區</Link></li>
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
