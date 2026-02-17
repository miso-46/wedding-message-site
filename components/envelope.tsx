"use client"

import { motion } from "framer-motion"

interface EnvelopeProps {
  isOpen: boolean
}

export function Envelope({ isOpen }: EnvelopeProps) {
  return (
    <div className="relative w-56 h-40 md:w-64 md:h-44 mx-auto" style={{ perspective: "800px" }}>
      {/* Envelope body */}
      <div className="absolute inset-0 rounded-md bg-[#F5F0E8] shadow-lg border border-[#C8BBA8]/50 overflow-hidden">
        {/* Envelope back pattern - decorative line */}
        <div className="absolute inset-x-4 top-3 bottom-3 border border-dashed border-[#C8BBA8]/40 rounded-sm" />
      </div>

      {/* Envelope front bottom part */}
      <div className="absolute inset-0 z-20 overflow-hidden rounded-md">
        <div
          className="absolute bottom-0 left-0 right-0 h-full bg-[#EDE7DB]"
          style={{
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 30%)",
          }}
        />
      </div>

      {/* Envelope flap (opens on success) */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        initial={{ rotateX: 0, zIndex: 30 }}
        animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 5 : 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 256 100"
          className="w-full block"
          style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.05))" }}
        >
          <path
            d="M0,0 L128,80 L256,0 L256,4 L128,84 L0,4 Z"
            fill="#E8E0D2"
          />
          <path
            d="M0,0 L128,80 L256,0"
            fill="#EDE7DB"
            stroke="#C8BBA8"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </svg>
      </motion.div>

      {/* Seal / heart decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-8 h-8 rounded-full bg-[#B85C47]/80 flex items-center justify-center shadow-sm">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#FFF8F0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
