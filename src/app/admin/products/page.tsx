'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, Package, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { mockProducts } from '@/lib/mockData'
import { Product, Category } from '@/types'

const CATEGORIES: Category[] = ['瘦身必瘦專區', '全民健康專區', '生活百貨', '限時優惠活動', '萌寵樂園', '里民福利特區']

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  original_price: undefined,
  category: '生活用品',
  images: [],
  stock: 0,
  is_active: true,
  specs: [],
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyProduct)
  const [specsInput, setSpecsInput] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageUrlInput, setImageUrlInput] = useState('')

  useEffect(() => {
    const auth = sessionStorage.getItem('admin-auth')
    if (!auth) router.replace('/admin')
  }, [router])

  const openAdd = () => {
    setEditingProduct(null)
    setForm(emptyProduct)
    setSpecsInput('')
    setImageUrls([])
    setImageUrlInput('')
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setForm({ ...product })
    setSpecsInput(product.specs?.join('、') || '')
    setImageUrls(product.images)
    setImageUrlInput('')
    setShowModal(true)
  }

  const handleToggleActive = (id: string) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, is_active: !p.is_active } : p)
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('確定要刪除此商品嗎？')) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  const addImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImageUrls(prev => [...prev, imageUrlInput.trim()])
      setImageUrlInput('')
    }
  }

  const removeImage = (idx: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const specs = specsInput ? specsInput.split(/[、,，]/).map(s => s.trim()).filter(Boolean) : []
    const productData: Product = {
      ...form,
      id: editingProduct?.id || String(Date.now()),
      images: imageUrls,
      specs,
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p))
    } else {
      setProducts(prev => [productData, ...prev])
    }
    setShowModal(false)
  }

  const logout = () => {
    sessionStorage.removeItem('admin-auth')
    router.replace('/admin')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">商品管理</h1>
          <p className="text-sm text-gray-400">共 {products.length} 件商品</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增商品
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            登出
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">商品</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">分類</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">售價</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">庫存</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">狀態</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        {product.images[0] ? (
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                        ) : (
                          <Package className="w-5 h-5 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700 line-clamp-2 max-w-[150px]">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">{product.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-orange-600">NT${product.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.stock}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleActive(product.id)}>
                      {product.is_active ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <Eye className="w-3.5 h-3.5" /> 上架中
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <EyeOff className="w-3.5 h-3.5" /> 已下架
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">{editingProduct ? '編輯商品' : '新增商品'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <Label>商品名稱 *</Label>
                <Input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="輸入商品名稱"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>售價 (NT$) *</Label>
                  <Input
                    type="number"
                    value={form.price || ''}
                    onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                    placeholder="0"
                    required
                    min={0}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>原價 (NT$)</Label>
                  <Input
                    type="number"
                    value={form.original_price || ''}
                    onChange={e => setForm(f => ({ ...f, original_price: e.target.value ? Number(e.target.value) : undefined }))}
                    placeholder="選填"
                    min={0}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>分類 *</Label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>庫存數量 *</Label>
                  <Input
                    type="number"
                    value={form.stock || ''}
                    onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
                    placeholder="0"
                    required
                    min={0}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>商品描述</Label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="輸入商品說明..."
                  rows={3}
                  className="mt-1 resize-none"
                />
              </div>

              <div>
                <Label>規格選項（用逗號或頓號分隔）</Label>
                <Input
                  value={specsInput}
                  onChange={e => setSpecsInput(e.target.value)}
                  placeholder="例如：100ml、200ml"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>商品圖片網址</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    placeholder="貼上圖片網址..."
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 flex-shrink-0"
                  >
                    新增
                  </button>
                </div>
                {imageUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 group">
                        <Image src={url} alt="" fill className="object-cover" sizes="64px" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                  className="accent-orange-500"
                />
                <Label htmlFor="is_active" className="cursor-pointer">上架此商品</Label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition-colors"
                >
                  {editingProduct ? '儲存修改' : '新增商品'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
