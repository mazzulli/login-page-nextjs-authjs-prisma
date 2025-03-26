"use client"

import { Dialog } from "@/_components/ui/dialog"
import { Button } from "@/_components/ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { UpsertSchoolDialogContent } from "./upsert-school-dialog-content"
import { PlusCircle } from "lucide-react"

export const CreateSchoolButton = () => {  
  const [dialogIsOpen, setDialogIsOpen] = useState(false)  
   
  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
      <Button className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Venue
        </Button>
      </DialogTrigger>
      <UpsertSchoolDialogContent onSuccess={()=> setDialogIsOpen(false)} />
    </Dialog>
  )
}