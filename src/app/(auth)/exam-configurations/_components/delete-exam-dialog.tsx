"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"

interface DeleteExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  examId: string
  onConfirmDelete: (id: string) => void
}

export default function DeleteExamDialog({ open, onOpenChange, examId, onConfirmDelete }: DeleteExamDialogProps) {
  if (!examId) return null

  return (
    <AlertDialog  open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
              Are you sure you want to delete this exam? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirmDelete(examId)} className="bg-red-700">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
