"use client"

import type React from "react"
import { Dialog } from "@/_components/ui/dialog"
import { ExamValue } from "@prisma/client"
import { UpsertExamDialogContent } from "./upsert-exam-dialog-content"

interface EditExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValues: ExamValue
}

export default function EditExamDialog({ open, onOpenChange, defaultValues }: EditExamDialogProps) {  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <UpsertExamDialogContent defaultValues={JSON.parse(JSON.stringify(defaultValues))} />
    </Dialog>
  )
}

