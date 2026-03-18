'use client'

import { MessageCircle } from 'lucide-react'

const LINE_ID = '' // 請填入您的 LINE ID，例如：@mumu_shop

export default function LineButton() {
  const lineUrl = LINE_ID
    ? `https://line.me/ti/p/${LINE_ID}`
    : 'https://line.me'

  return (
    <a
      href={lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#06C755] hover:bg-[#05a848] text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
      aria-label="LINE 聯絡我們"
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span className="text-sm font-semibold hidden sm:inline">LINE 聯絡</span>
    </a>
  )
}
