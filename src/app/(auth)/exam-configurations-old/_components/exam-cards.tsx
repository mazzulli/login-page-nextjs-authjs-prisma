"use client"

import { Button } from "@/_components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card"
import { CurrencyFormat } from "@/_utils/currencyFormat"
import { ExamValue } from "@prisma/client"
import { EditIcon, Trash2Icon } from "lucide-react"
import { UpsertExamDialogContent } from "./upsert-exam-dialog-content"
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/_components/ui/dialog"
import DeleteExamDialogContent from "./delete-exam-dialog-content"
import { AlertDialog, AlertDialogTrigger } from "@/_components/ui/alert-dialog"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/router"

interface ExamCardsProps {
  exams: ExamValue[]
}

export default function ExamCards({ exams }: ExamCardsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)       
  const router = useRouter()
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <AlertDialog>
        {exams.map((exam) => (        
          <Card key={exam.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-lg">{exam.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <p className="text-2xl font-bold text-green-600">
                {CurrencyFormat(Number(exam.price))}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t">
              <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <EditIcon className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </DialogTrigger>              
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2Icon className="h-4 w-4 mr-1" /> Delete
                  </Button>                  
                </AlertDialogTrigger>                
                <UpsertExamDialogContent 
                  defaultValues={{
                    id: exam.id, 
                    name: exam.name,
                    price: String(exam.price),
                  }}                
                  onSuccess={()=> {
                    setEditDialogOpen(false)
                    revalidatePath("/exam-configurations")
                    router.reload()
                  }}
                /> 
                <DeleteExamDialogContent examId={exam.id} />
                </Dialog>
            </CardFooter>
          </Card>        
        ))}
      </AlertDialog>
    </div>
  )
}

