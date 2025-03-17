"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, Linkedin, Upload } from "lucide-react"

interface ResumeUploadStepProps {
  resumeUploaded: boolean
  updateResumeUploaded: (uploaded: boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function ResumeUploadStep({
  resumeUploaded,
  updateResumeUploaded,
  onNext,
  onBack,
}: ResumeUploadStepProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is PDF or DOCX
    if (
      file.type === "application/pdf" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileName(file.name)
      simulateUpload(file)
    } else {
      alert("Please upload a PDF or DOCX file")
    }
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      updateResumeUploaded(true)
    }, 2000)
  }

  const handleLinkedInImport = () => {
    setIsUploading(true)

    // Simulate LinkedIn import
    setTimeout(() => {
      setIsUploading(false)
      setFileName("LinkedIn Profile")
      updateResumeUploaded(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Import your experience</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload your resume or import from LinkedIn to get personalized recommendations
        </p>
      </div>

      <div className="space-y-4">
        <Card
          className={`border-2 border-dashed ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 rounded-full bg-primary/10 p-3">
              <FileUp className="h-6 w-6 text-primary" />
            </div>

            {!resumeUploaded ? (
              <>
                <p className="mb-2 text-sm font-medium">
                  {isDragging ? "Drop your file here" : "Drag and drop your resume"}
                </p>
                <p className="mb-4 text-xs text-muted-foreground">Supports PDF, DOCX (Max 5MB)</p>
                <div className="relative">
                  <input
                    type="file"
                    id="resume-upload"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileInput}
                    disabled={isUploading}
                  />
                  <Button variant="outline" size="sm" disabled={isUploading}>
                    <Upload className="mr-2 h-4 w-4" />
                    Browse files
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="mb-2 text-sm font-medium text-green-600">Resume uploaded successfully!</p>
                <p className="mb-4 text-xs">{fileName}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateResumeUploaded(false)
                    setFileName(null)
                  }}
                >
                  Upload a different file
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleLinkedInImport}
          disabled={isUploading || resumeUploaded}
        >
          <Linkedin className="mr-2 h-4 w-4" />
          Import from LinkedIn
        </Button>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading...</span>
              <span>60%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-full w-3/5 rounded-full bg-primary" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isUploading}>
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" disabled={isUploading}>
          {resumeUploaded ? "Continue" : "Skip for now"}
        </Button>
      </div>
    </div>
  )
}

