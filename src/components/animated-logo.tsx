"use client"

import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

export function AnimatedLogo({ className }: AnimatedLogoProps) {
  return (
    <motion.div 
      className={cn("logo-container", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
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
    </motion.div>
  );
}

