"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, FileDown, Share2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CVData } from "@/types"

interface CVGenerationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: CVData
}

export function CVGenerationModal({ open, onOpenChange, data }: CVGenerationModalProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"generating" | "complete">("generating")

  useEffect(() => {
    if (open && status === "generating") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStatus("complete")
            return 100
          }
          return prev + 10
        })
      }, 500)

      return () => clearInterval(interval)
    }
  }, [open, status])

  const handleDownload = () => {
    // Implement actual download logic here
    console.log("Downloading CV", data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{status === "generating" ? "Generating your CV" : "CV Ready!"}</DialogTitle>
          <DialogDescription>
            {status === "generating"
              ? "Please wait while we generate your professional CV..."
              : "Your CV has been generated successfully. You can download it now."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {status === "generating" ? (
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <FileDown className="h-4 w-4 text-primary" />
                  Formatting content...
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <div className="rounded-full bg-primary/10 p-6">
                    <FileDown className="h-12 w-12 text-primary" />
                  </div>
                </motion.div>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share CV
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

