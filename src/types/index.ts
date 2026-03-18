export type Category = '全部' | '生活用品' | '美容美妝' | '零食' | '保健' | '瘦身' | '寵物' | '親子'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price?: number
  category: Category
  images: string[]
  stock: number
  is_active: boolean
  specs?: string[]
  created_at?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSpec?: string
}

export interface Order {
  id?: string
  customer_name: string
  phone: string
  address: string
  payment_method: string
  note?: string
  items: CartItem[]
  total: number
  status?: string
  created_at?: string
}
