"use client"

import { Dialog, DialogDescription } from "@/_components/ui/dialog"
import { Button } from "@/_components/ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { UpsertExamDialogContent } from "./upsert-exam-dialog-content"
import { PlusCircle } from "lucide-react"

export const CreateExamButton = () => {  
  const [dialogIsOpen, setDialogIsOpen] = useState(false)  
   
  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogDescription />            
      <DialogTrigger asChild>
      <Button className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Exam
        </Button>
      </DialogTrigger>
      <UpsertExamDialogContent onSuccess={()=> setDialogIsOpen(false)} />
    </Dialog>
  )
}