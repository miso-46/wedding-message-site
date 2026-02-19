"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Envelope } from "@/components/envelope"
import { LetterOverlay } from "@/components/letter-overlay"

type AppState = "idle" | "searching" | "opening" | "reading"

type GuestData = {
  name: string
  message: string
}

const SAVED_GUEST_KEY = "saved_guest"

/** 全角・半角スペースを削除 */
function removeSpaces(str: string): string {
  return str.replace(/\s/g, "").replace(/\u3000/g, "")
}

/** ひらがなをカタカナに変換 */
function hiraganaToKatakana(str: string): string {
  return str.replace(/[\u3040-\u309F]/g, (match) => {
    const chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  })
}

/** 検索用にユーザー入力を正規化 */
function normalizeForSearch(input: string): string {
  return hiraganaToKatakana(removeSpaces(input))
}

export default function WeddingMessagePage() {
  const [state, setState] = useState<AppState>("idle")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [guestName, setGuestName] = useState("")
  const [guestMessage, setGuestMessage] = useState("")
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [savedGuest, setSavedGuest] = useState<GuestData | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const [envelopeShake, setEnvelopeShake] = useState(false)
  const resetTapCountRef = useRef(0)
  const resetTapTimeRef = useRef<number>(0)

  // ページ読み込み時に localStorage をチェック
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem(SAVED_GUEST_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as GuestData
        if (parsed?.name && parsed?.message) {
          setSavedGuest(parsed)
          setName(parsed.name)
        }
      }
    } catch {
      // パースエラー時は無視
    }
    setIsHydrated(true)
  }, [])

  const openLetter = useCallback((displayName: string, message: string) => {
    setGuestName(displayName)
    setGuestMessage(message)
    setState("opening")

    setTimeout(() => {
      setEnvelopeOpen(true)
    }, 300)

    setTimeout(() => {
      setState("reading")
    }, 1000)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!name.trim()) return

      setError("")

      // すでに保存済みの場合は検索せず直接開く
      if (savedGuest) {
        openLetter(savedGuest.name, savedGuest.message)
        return
      }

      setState("searching")

      try {
        const res = await fetch("/data.json")
        if (!res.ok) throw new Error("Failed to fetch")
        const guests: Array<{ id: string; kanjiName: string; kanaName: string; message: string }> =
          await res.json()

        const normalizedInput = normalizeForSearch(name)

        const found = guests.find(
          (g) =>
            normalizedInput === g.kanjiName || normalizedInput === g.kanaName
        )

        if (found) {
          const guestData: GuestData = {
            name: found.kanjiName,
            message: found.message,
          }
          localStorage.setItem(SAVED_GUEST_KEY, JSON.stringify(guestData))
          setSavedGuest(guestData)
          openLetter(guestData.name, guestData.message)
        } else {
          setError("お名前が見つかりません。入力ミスがないかご確認ください。")
          setState("idle")
        }
      } catch {
        setError("データの読み込みに失敗しました。しばらく経ってからお試しください。")
        setState("idle")
      }
    },
    [name, savedGuest, openLetter]
  )

  const handleReset = useCallback(() => {
    setState("opening")

    setTimeout(() => {
      setEnvelopeOpen(false)
    }, 300)

    setTimeout(() => {
      setState("idle")
      setGuestName("")
      setGuestMessage("")
    }, 900)
  }, [])

  /** 隠しリセット: 3秒以内に5回タップで localStorage クリア＆リロード */
  const handleResetHintClick = useCallback(() => {
    const now = Date.now()
    if (now - resetTapTimeRef.current > 3000) {
      resetTapCountRef.current = 0
    }
    resetTapTimeRef.current = now
    resetTapCountRef.current += 1
    if (resetTapCountRef.current >= 5) {
      localStorage.clear()
      window.location.reload()
    }
  }, [])

  const isInputDisabled =
    savedGuest !== null || state === "searching" || state === "opening" || state === "reading"
  const isButtonDisabled =
    !savedGuest && (state === "searching" || state === "opening" || state === "reading" || !name.trim())

  if (!isHydrated) {
    return (
      <main className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-8 h-8 border-2 border-[#B85C47]/30 border-t-[#B85C47] rounded-full animate-spin" />
      </main>
    )
  }

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
            {"- 2026.03.14 Shinro Name & Shimpu Name -"}
          </p>
        </motion.div>

        {/* Envelope - fixed height container to prevent layout shift */}
        <motion.div
          className="mb-10 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: envelopeShake ? [0, -4, 4, -3, 3, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3 },
            x: envelopeShake ? { duration: 0.8, ease: "easeInOut" } : { duration: 0 },
          }}
          onAnimationComplete={() => envelopeShake && setEnvelopeShake(false)}
          onClick={() => setEnvelopeShake(true)}
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
                    if (!savedGuest) {
                      setName(e.target.value)
                      if (error) setError("")
                    }
                  }}
                  placeholder="例：鈴木太郎"
                  disabled={isInputDisabled}
                  className="w-full px-4 py-3 bg-[#FFFCF7] border border-[#C8BBA8] rounded-lg text-[#6B2D24] placeholder-[#C8BBA8] text-center text-base focus:outline-none focus:ring-2 focus:ring-[#B85C47]/30 focus:border-[#B85C47]/50 transition-all disabled:opacity-50"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={isButtonDisabled}
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
          {(state === "idle" || savedGuest) && !error && (
            <motion.p
              className="text-xs text-[#8B6B5E]/60 mt-6 text-center cursor-default select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={handleResetHintClick}
            >
              {"※一度お手紙を開くと、他のお名前では検索できなくなります"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Letter reading overlay */}
      <AnimatePresence>
        {state === "reading" && (
          <LetterOverlay
            guestName={guestName}
            message={guestMessage}
            onClose={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
