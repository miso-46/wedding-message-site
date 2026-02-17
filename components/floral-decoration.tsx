"use client"

import { motion } from "framer-motion"

export function FloralDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top left leaf */}
      <motion.svg
        className="absolute -top-2 -left-4 w-28 h-28 text-[#8A9A86]/20"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <path
          d="M10,50 Q25,10 50,10 Q75,10 90,50 Q75,40 50,45 Q25,50 10,50 Z"
          fill="currentColor"
        />
        <path
          d="M15,55 Q30,25 50,20 Q45,35 15,55 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </motion.svg>

      {/* Top right leaf */}
      <motion.svg
        className="absolute -top-2 -right-4 w-28 h-28 text-[#8A9A86]/20 scale-x-[-1]"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <path
          d="M10,50 Q25,10 50,10 Q75,10 90,50 Q75,40 50,45 Q25,50 10,50 Z"
          fill="currentColor"
        />
        <path
          d="M15,55 Q30,25 50,20 Q45,35 15,55 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </motion.svg>

      {/* Bottom decorative dots */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="w-1 h-1 rounded-full bg-[#B85C47]/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#8A9A86]/25" />
        <div className="w-1 h-1 rounded-full bg-[#B85C47]/20" />
      </motion.div>
    </div>
  )
}
