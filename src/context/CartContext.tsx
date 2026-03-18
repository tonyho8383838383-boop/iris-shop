'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number, selectedSpec?: string) => void
  removeItem: (productId: string, selectedSpec?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSpec?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('mumu-cart')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mumu-cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity: number, selectedSpec?: string) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedSpec === selectedSpec
      )
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedSpec === selectedSpec
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity, selectedSpec }]
    })
  }

  const removeItem = (productId: string, selectedSpec?: string) => {
    setItems(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedSpec === selectedSpec)
      )
    )
  }

  const updateQuantity = (productId: string, quantity: number, selectedSpec?: string) => {
    if (quantity <= 0) {
      removeItem(productId, selectedSpec)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedSpec === selectedSpec
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
