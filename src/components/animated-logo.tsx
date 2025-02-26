"use client"

import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export function AnimatedLogo() {
  return (
    <div className="flex items-center gap-2 font-semibold">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Sparkles className="h-6 w-6 text-primary" />
      </motion.div>
      <span className="text-xl">Exel</span>
    </div>
  )
}

