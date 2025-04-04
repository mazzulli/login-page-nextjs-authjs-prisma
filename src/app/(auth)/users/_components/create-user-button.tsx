"use client"

import { Dialog } from "@/_components/ui/dialog"
import { Button } from "@/_components/ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { UpsertUserDialogContent } from "./upsert-user-dialog-content"

export const CreateUserButton = () => {  
  const [dialogIsOpen, setDialogIsOpen] = useState(false)  
   
  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
      <Button className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New User
        </Button>
      </DialogTrigger>
      <UpsertUserDialogContent onSuccess={()=> setDialogIsOpen(false)} />
    </Dialog>
  )
}