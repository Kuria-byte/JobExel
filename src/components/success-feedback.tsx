"use client"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SuccessFeedbackProps {
  show: boolean
  title: string
  description: string
  tip?: {
    text: string
    action: string
    onClick: () => void
  }
  onClose: () => void
}

export function SuccessFeedback({ show, title, description, tip, onClose }: SuccessFeedbackProps) {
  // Add state for animation timing
  const [animationEnd] = useState(() => Date.now() + 3000); // 3 seconds duration
  const duration = 3000; // Define duration as a constant

  useEffect(() => {
    if (show) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }
        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#4F46E5", "#06B6D4", "#10B981"],
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#4F46E5", "#06B6D4", "#10B981"],
        })
      }, 250)
      
      return () => clearInterval(interval)
    }
  }, [animationEnd, show]) // Remove animationEnd and duration from dependencies
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className="w-[380px] shadow-lg">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <XCircle className="h-4 w-4" />
              </Button>
            </CardHeader>
            {tip && (
              <>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">Pro tip:</p>
                  <p className="text-sm">{tip.text}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2" onClick={tip.onClick}>
                    {tip.action}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}