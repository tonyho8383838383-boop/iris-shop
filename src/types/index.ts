export type Category = '全部' | '瘦身必瘦專區' | '全民健康專區' | '生活百貨' | '限時優惠活動' | '萌寵樂園' | '里民福利特區'

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
