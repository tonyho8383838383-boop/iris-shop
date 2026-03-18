'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, Store } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ADMIN_PASSWORD = 'iris2024'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true')
      router.push('/admin/products')
    } else {
      setError('密碼錯誤，請重試')
      setPassword('')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-full mb-4">
            <Store className="w-7 h-7 text-orange-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Iris好物專屬購物區後台</h1>
          <p className="text-sm text-gray-400 mt-1">請輸入管理員密碼</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="password">管理員密碼</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="輸入密碼..."
                className={`pl-9 pr-10 ${error ? 'border-red-400' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            登入後台
          </button>
        </form>

        <p className="text-center text-xs text-gray-300 mt-6">預設密碼：mumu2024</p>
      </div>
    </div>
  )
}
