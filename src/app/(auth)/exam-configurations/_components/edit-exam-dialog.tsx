"use client"

import type React from "react"
import { Dialog } from "@/_components/ui/dialog"
import { UpsertExamDialogContent } from "./upsert-exam-dialog-content"
import { ExamConfigSchema } from "@/_lib/models/exam-schema"

interface EditExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues: ExamConfigSchema
}

export default function EditExamDialog({ open, onOpenChange, defaultValues }: EditExamDialogProps) {    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <UpsertExamDialogContent defaultValues={JSON.parse(JSON.stringify(defaultValues))} />
    </Dialog>
  )
}

