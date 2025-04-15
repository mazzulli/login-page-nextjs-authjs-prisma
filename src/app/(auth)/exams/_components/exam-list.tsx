"use client"

import { useState } from "react"
import { CreateExamButton } from "./create-exam-button"
import { tableColumns } from "./table-columns"
import { DataTable } from "@/_components/ui/data-table"
import { ExamData } from "@/_lib/models/exam-schema"
import { CollaboratorProps } from "@/app/_data-access/get-collaborators-by-type"
import { ExamValue } from "@prisma/client"
import { VenueProps } from "@/app/_data-access/get-venues"

interface Props {
    initialExams: ExamData[]
    venuesData: VenueProps[]
    supervisorsData: CollaboratorProps[]
    invigilatorsData: CollaboratorProps[]
    speakingsData: CollaboratorProps[]
    examTypesDatda: ExamValue[]
}

export function ExamList({initialExams, venuesData, supervisorsData, invigilatorsData, speakingsData, examTypesDatda}:Props) {
  const [exams, setExams] = useState<ExamData[]>(initialExams)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [editingExam, setEditingExam] = useState<ExamData | null>(null)

  const handleAddExam = (newExam: ExamData) => {
    if (editingExam) {
      setExams(exams.map((exam) => (exam.id === editingExam.id ? { ...newExam, id: exam.id } : exam)))
      setEditingExam(null)
    } else {
      setExams([...exams, { ...newExam, id: Date.now().toString(), status: "open" }])
    }
    setIsDialogOpen(false)
  }

  return (
    <DataTable 
        columns={tableColumns} 
        sortedColumn={"description"} 
        data={JSON.parse(JSON.stringify(exams))} 
        controlButton={
        <CreateExamButton 
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSave={handleAddExam}
            initialData={editingExam}
            venues={venuesData}
            supervisors={supervisorsData}
            invigilators={invigilatorsData}
            speakings={speakingsData}
            examTypes={examTypesDatda}
        />             
    } />      
  )
}
