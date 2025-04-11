"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/_components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs"
import { useState } from "react"
// import { UpsertExamDialogContent } from "./upsert-exam-dialog-content"
import { PlusCircle } from "lucide-react"
import ExamForm from "./exam-form"
import SupervisorForm from "./supervisor-form"
import InvigilatorForm from "./invigilator-form"
import SpeakingForm from "./speaking-form"
import NotesForm from "./notes-form"
import { Button } from "@/_components/ui/button"

export const CreateExamButton = () => {  
  const [dialogIsOpen, setDialogIsOpen] = useState(false)  
  const [formData, setFormData] = useState({
    exam: {
      venue: "",
      date: new Date(),
      description: "",
      notes: "",
    },
    supervisor: [
      {
        id: Date.now(),
        name: "",
        hours: "",
      },
    ],
    invigilator: [
      {
        id: Date.now() + 1,
        name: "",
        hours: "",
      },
    ],
    speaking: [
      {
        id: Date.now() + 2,
        name: "",
        qtyApplicants: "",
        exam: "",
      },
    ],
    notes: {
      content: "",
    },
  })

  const handleSubmit = async () => {
    // Here you would implement the logic to save the data to PostgreSQL
    console.log("Form data to be submitted:", formData)

    // Close the dialog after submission
    setDialogIsOpen(false)
  }

  const updateFormData = (section: string, data: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogDescription />            
      <DialogTrigger asChild>
      <Button className="bg-green-700 text-white">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Exam
      </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[600px]">
        <DialogHeader>          
          <DialogTitle>New Exam</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="exam" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-green-600">
            <TabsTrigger className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white" value="exam">Exam</TabsTrigger>
            <TabsTrigger className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white" value="supervisor">Supervisor</TabsTrigger>
            <TabsTrigger className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white" value="invigilator">Invigilator</TabsTrigger>
            <TabsTrigger className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white" value="speaking">Speaking</TabsTrigger>
            <TabsTrigger className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white" value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="exam">
            <ExamForm data={formData.exam} onChange={(data) => updateFormData("exam", data)} />
          </TabsContent>
          <TabsContent value="supervisor">
            <SupervisorForm data={formData.supervisor} onChange={(data) => updateFormData("supervisor", data)} />
          </TabsContent>
          <TabsContent value="invigilator">
            <InvigilatorForm data={formData.invigilator} onChange={(data) => updateFormData("invigilator", data)} />
          </TabsContent>
          <TabsContent value="speaking">
            <SpeakingForm data={formData.speaking} onChange={(data) => updateFormData("speaking", data)} />
          </TabsContent>
          <TabsContent value="notes">
            <NotesForm
              data={formData.notes}
              onChange={(data) => updateFormData("notes", data)}
              onSubmit={handleSubmit}
              onCancel={() => setDialogIsOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
    // <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
    //   <DialogDescription />            
    //   <DialogTrigger asChild>
    //   <Button className="bg-green-700 text-white">
    //       <PlusCircle className="mr-2 h-4 w-4" />
    //       New Exam
    //     </Button>
    //   </DialogTrigger>
    //   {/* <UpsertExamDialogContent onSuccess={()=> setDialogIsOpen(false)} /> */}
    //   <ExamForm data={formData.exam} onChange={(data) => updateFormData("exam", data)} />
    // </Dialog>
  )
}