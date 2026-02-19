"use client"

import { motion } from "framer-motion"

interface LetterOverlayProps {
  guestName: string
  message: string
  onClose: () => void
}

export function LetterOverlay({ guestName, message, onClose }: LetterOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dark overlay background */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Letter */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-auto"
        initial={{ y: 200, scale: 0.3, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 200, scale: 0.3, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="bg-[#FFFCF7] rounded-lg shadow-2xl border border-[#C8BBA8]/30 p-8 md:p-10 relative overflow-hidden max-h-[85svh] flex flex-col">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#B85C47]/20" />

          {/* Decorative corner ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C8BBA8]/40 rounded-tl-sm" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C8BBA8]/40 rounded-tr-sm" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#C8BBA8]/40 rounded-bl-sm" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C8BBA8]/40 rounded-br-sm" />

          {/* Content - Flexbox layout */}
          <div className="relative z-10 flex flex-col flex-1 min-h-0 text-center">
            {/* 上部エリア（固定）: Dear 〜 区切り線 */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-sm text-[#8B6B5E] tracking-wider">Dear</p>
                <p className="text-2xl font-medium text-[#6B2D24] mt-1 font-serif tracking-wide">
                  {guestName}
                </p>
                <p className="text-sm text-[#8B6B5E] mt-1 tracking-wider">{"様"}</p>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-3 mt-4"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="h-px w-12 bg-[#C8BBA8]" />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#B85C47"
                  opacity={0.6}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="h-px w-12 bg-[#C8BBA8]" />
              </motion.div>
            </div>

            {/* 中間エリア: メッセージ本文（スクロール領域） */}
            <div className="flex-1 min-h-0 overflow-y-auto py-6 pr-3">
              <motion.div
                className="text-[#6B2D24]/90 text-sm leading-relaxed whitespace-pre-wrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {message || (
                  <p className="text-[#8B6B5E]/70">メッセージがありません</p>
                )}
              </motion.div>
            </div>

            {/* 下部エリア（固定）: 差出人・ボタン */}
            <div className="flex-shrink-0 pt-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="text-xs text-[#8B6B5E] tracking-wider">2026.03.14</p>
                <p className="text-sm text-[#6B2D24] mt-1 font-medium">
                  裏岡 雅史 & 三木 悠夏子
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <button
                  onClick={onClose}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[#8B6B5E] hover:text-[#6B2D24] cursor-pointer border border-[#C8BBA8]/60 rounded-full px-6 py-2.5 hover:border-[#B85C47]/40 hover:bg-[#F5F0E8]/80 hover:shadow-md hover:shadow-[#C8BBA8]/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200"
                  aria-label="最初の画面に戻る"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  最初の画面に戻る
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
