import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LineButton from '@/components/layout/LineButton'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'Iris好物專屬購物區 | 精選生活好物',
  description: 'Iris精選生活用品、美妝、零食、保健商品，讓每一天都更美好。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={notoSansTC.variable}>
      <body className="font-[family-name:var(--font-noto)] antialiased bg-gray-50 min-h-screen">
        <CartProvider>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
          <LineButton />
        </CartProvider>
      </body>
    </html>
  )
}
