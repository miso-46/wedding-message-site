"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Envelope } from "@/components/envelope"
import { LetterOverlay } from "@/components/letter-overlay"


type AppState = "idle" | "searching" | "opening" | "reading"

export default function WeddingMessagePage() {
  const [state, setState] = useState<AppState>("idle")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [guestName, setGuestName] = useState("")
  const [envelopeOpen, setEnvelopeOpen] = useState(false)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!name.trim()) return

      setError("")
      setState("searching")

      // Dummy logic: "テスト" in name = success, else = error
      setTimeout(() => {
        if (name.includes("テスト")) {
          setGuestName(name.trim())
          setState("opening")

          // Step 1: Open envelope flap
          setTimeout(() => {
            setEnvelopeOpen(true)
          }, 300)

          // Step 2: Show letter overlay after flap opens
          setTimeout(() => {
            setState("reading")
          }, 1000)
        } else {
          setError("お名前が見つかりません。入力ミスがないかご確認ください。")
          setState("idle")
        }
      }, 800)
    },
    [name]
  )

  const handleReset = useCallback(() => {
    setState("opening")

    // Close envelope flap
    setTimeout(() => {
      setEnvelopeOpen(false)
    }, 300)

    // Reset to idle after flap closes
    setTimeout(() => {
      setState("idle")
      setName("")
      setGuestName("")
    }, 900)
  }, [])

  const isInputDisabled = state === "searching" || state === "opening" || state === "reading"

  return (
    <main className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-sm md:max-w-md mx-auto px-6 py-12 flex flex-col items-center relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-[#6B2D24] tracking-wide text-balance">
            Message for You !
          </h1>
          <p className="text-xs md:text-sm text-[#8B6B5E] mt-3 tracking-widest">
            {"- 2026.03.14 Uraoka Masafumi & Yukako Miki -"}
          </p>
        </motion.div>

        {/* Envelope - fixed height container to prevent layout shift */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Envelope isOpen={envelopeOpen} />
        </motion.div>

        {/* Input form */}
        <AnimatePresence mode="wait">
          {(state === "idle" || state === "searching") && (
            <motion.form
              key="search-form"
              onSubmit={handleSubmit}
              className="w-full space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-2">
                <label
                  htmlFor="guest-name"
                  className="block text-sm text-[#6B2D24] text-center"
                >
                  お名前を入力してください
                </label>
                <input
                  id="guest-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (error) setError("")
                  }}
                  placeholder="例：鈴木太郎"
                  disabled={isInputDisabled}
                  className="w-full px-4 py-3 bg-[#FFFCF7] border border-[#C8BBA8] rounded-lg text-[#6B2D24] placeholder-[#C8BBA8] text-center text-base focus:outline-none focus:ring-2 focus:ring-[#B85C47]/30 focus:border-[#B85C47]/50 transition-all disabled:opacity-50"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={isInputDisabled || !name.trim()}
                className="w-full py-3 rounded-lg bg-[#B85C47] text-[#FFF8F0] font-medium text-sm tracking-wider hover:bg-[#A04E3C] hover:shadow-lg hover:shadow-[#B85C47]/20 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:ring-2 focus:ring-[#B85C47]/30 focus:ring-offset-2 focus:ring-offset-[#E6DECE] transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed cursor-pointer"
              >
                {state === "searching" ? (
                  <span className="inline-flex items-center gap-2">
                    <motion.span
                      className="inline-block w-4 h-4 border-2 border-[#FFF8F0]/30 border-t-[#FFF8F0] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    検索中...
                  </span>
                ) : (
                  "メッセージを見る"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Error toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="fixed top-6 left-1/2 z-50 w-[90vw] max-w-sm"
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="bg-[#FFFCF7] border border-[#C8BBA8] rounded-lg shadow-lg px-5 py-4 flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#B85C47"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#6B2D24] leading-relaxed">{error}</p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="shrink-0 text-[#8B6B5E] hover:text-[#6B2D24] transition-colors cursor-pointer"
                  aria-label="閉じる"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text */}
        <AnimatePresence>
          {state === "idle" && !error && (
            <motion.p
              className="text-xs text-[#8B6B5E]/60 mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {"※ テスト: 「テスト」を含む名前で成功します"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Letter reading overlay */}
      <AnimatePresence>
        {state === "reading" && (
          <LetterOverlay guestName={guestName} onClose={handleReset} />
        )}
      </AnimatePresence>
    </main>
  )
}
