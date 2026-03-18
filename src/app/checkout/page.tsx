'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

type PaymentMethod = '匯款' | '貨到付款' | 'LINE Pay'

const PAYMENT_METHODS: PaymentMethod[] = ['匯款', '貨到付款', 'LINE Pay']

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
    payment_method: '匯款' as PaymentMethod,
    note: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (items.length === 0 && !success) {
    router.replace('/cart')
    return null
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.customer_name.trim()) newErrors.customer_name = '請填寫姓名'
    if (!form.phone.trim()) newErrors.phone = '請填寫電話'
    else if (!/^09\d{8}$/.test(form.phone.trim())) newErrors.phone = '請輸入正確的手機號碼'
    if (!form.address.trim()) newErrors.address = '請填寫收件地址'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    // In production: save order to Supabase here
    await new Promise(resolve => setTimeout(resolve, 1200))
    clearCart()
    setSuccess(true)
    setSubmitting(false)
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-5" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">訂單送出成功！</h2>
        <p className="text-gray-500 mb-2">感謝您的購買，我們會盡快與您聯絡確認訂單。</p>
        <p className="text-sm text-gray-400 mb-8">如有疑問請透過 LINE 聯絡我們。</p>
        <Link
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          回到首頁
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link href="/cart" className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-4">
        <ArrowLeft className="w-4 h-4" />
        返回購物車
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">填寫訂購資料</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-semibold text-gray-700">收件資料</h2>

            <div>
              <Label htmlFor="name">姓名 <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                value={form.customer_name}
                onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                placeholder="請輸入真實姓名"
                className={`mt-1 ${errors.customer_name ? 'border-red-400' : ''}`}
              />
              {errors.customer_name && <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>}
            </div>

            <div>
              <Label htmlFor="phone">手機號碼 <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="09xxxxxxxx"
                className={`mt-1 ${errors.phone ? 'border-red-400' : ''}`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="address">收件地址 <span className="text-red-500">*</span></Label>
              <Input
                id="address"
                value={form.address}
                onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                placeholder="縣市 + 區 + 詳細地址"
                className={`mt-1 ${errors.address ? 'border-red-400' : ''}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h2 className="font-semibold text-gray-700">付款方式</h2>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, payment_method: method }))}
                  className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                    form.payment_method === method
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <Label htmlFor="note">備註（選填）</Label>
            <Textarea
              id="note"
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="如有特殊需求請填寫..."
              className="mt-1 resize-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3.5 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                送出中...
              </>
            ) : (
              '確認送出訂單'
            )}
          </button>
        </form>

        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-20">
            <h2 className="font-semibold text-gray-700 mb-4">訂單明細</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map(item => (
                <div key={`${item.product.id}-${item.selectedSpec}`} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 line-clamp-1">{item.product.name}</p>
                    {item.selectedSpec && <p className="text-xs text-gray-400">{item.selectedSpec}</p>}
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-orange-600 flex-shrink-0">
                    NT${item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>小計</span>
                <span>NT${totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>運費</span>
                <span className="text-green-600">免運費</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800">
                <span>總計</span>
                <span className="text-orange-600 text-xl">NT${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
