"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card"
import { Button } from "@/_components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import EditExamDialog from "./edit-exam-dialog"
import DeleteExamDialog from "./delete-exam-dialog"
import { ExamValue } from "@prisma/client"
import { deleteExam } from "@/_lib/_actions/exams/delete-exam"
import { toast } from "@/_hooks/use-toast"

interface ExamCardsProps {
  exams: ExamValue[]
}

export default function ExamCards({ exams: examData }: ExamCardsProps) {
  const [editingExam, setEditingExam] = useState<ExamValue>()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [examToDelete, setExamToDelete] = useState("")

  const handleEditExam = (exam: ExamValue) => {
    console.log(JSON.stringify(exam));
    setEditingExam(exam)
    setIsEditDialogOpen(true)    
  }

  const handleDeleteExam = (examId: string) => {
    setExamToDelete(examId)
    setIsDeleteDialogOpen(true)    
  }

  const handleConfirmDelete = async (examId: string) => {    
    try {
      await deleteExam({id: examId})      
      setIsDeleteDialogOpen(false)     
      // Force refresh the page
      window.location.reload()
      toast({
        title: "Success!",  
        description: "Exam deleted successfully.",
      })
    
    } catch (error) {
        console.error(error)
        toast({
            title: "Error",  
            description: `Oh no! Something went wrong.`,
        })
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {examData.map((exam) => (
          <Card key={exam.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-lg">{exam.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(exam.price)/100)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => handleEditExam(exam)}>
                <Pencil className="h-4 w-4 mr-1" /> Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteExam(exam.id)}>
                <Trash2 className="h-4 w-4 mr-1" /> Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingExam ? 
      <EditExamDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        defaultValues={JSON.parse(JSON.stringify(editingExam))}
      /> : null}
           

      <DeleteExamDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        examId={examToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  )
}

