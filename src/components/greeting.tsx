"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface GreetingProps {
  name: string
}

export function Greeting({ name }: GreetingProps) {
  const [isWaving, setIsWaving] = useState(false)

  const handleMouseEnter = () => {
    setIsWaving(true)
  }

  const handleMouseLeave = () => {
    setIsWaving(false)
  }

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold">
        Hey{" "}
        <motion.span
          className="inline-block cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={
            isWaving
              ? {
                  rotate: [0, 20, -10, 15, -5, 0],
                  transition: { duration: 0.5 },
                }
              : {}
          }
        >
          👋
        </motion.span>
        , {name}
      </h1>
    </div>
  )
}

