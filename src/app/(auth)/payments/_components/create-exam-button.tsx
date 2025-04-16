"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/_components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_components/ui/tabs"
import { Button } from "@/_components/ui/button"
import { Form } from "@/_components/ui/form"
import { ExamData, examFormSchema, ExamFormValues } from "@/_lib/models/exam-schema"
import { ExamInformationForm } from "./exam-forms/exam-information-form"
import { SupervisorsForm } from "./exam-forms/supervisors-form"
import { InvigilatorsForm } from "./exam-forms/invigilators-form"
import { SpeakingsForm } from "./exam-forms/speakings-form"
import { PlusCircle } from "lucide-react"
import { CollaboratorProps } from "@/app/_data-access/get-collaborators-by-type"
import { ExamValue } from "@prisma/client"
import { VenueProps } from "@/app/_data-access/get-venues"

interface CreateExamButtonProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: ExamData) => void
  initialData: ExamData | null
  venues: VenueProps[]
  supervisors: CollaboratorProps[]
  invigilators: CollaboratorProps[]
  speakings: CollaboratorProps[]
  examTypes: ExamValue[]
}
export function CreateExamButton({ 
  open, 
  onOpenChange, 
  onSave, 
  initialData = null,
  venues,
  supervisors,
  invigilators,
  speakings, 
  examTypes,
 }: CreateExamButtonProps ) {
  const [activeTab, setActiveTab] = useState("exam-information")
  
  // Define form with zod resolver
  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      date: new Date(),
      venue: "",
      description: "",
      notes: "",
      supervisors: [],
      invigilators: [],
      speakings: [],
    },
  })

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      // Transform the data to match the form structure
      const formattedData = {
        ...initialData,
        supervisors:
          initialData.supervisors?.map((item) => ({
            id: item.id || Date.now().toString(),
            collaboratorId: item.collaboratorId, 
            collaboratorName: item.collaboratorName || "",
            workedHours: item.workedHours || 0,
          })) || [],
        invigilators:
          initialData.invigilators?.map((item) => ({
            id: item.id || Date.now().toString(),
            collaboratorId: item.collaboratorId, 
            collaboratorName: item.collaboratorName || "",
            workedHours: item.workedHours || 0,
          })) || [],
        speakings:
          initialData.speakings?.map((item) => ({
            id: item.id || Date.now().toString(),
            collaboratorId: item.collaboratorId, 
            collaboratorName: item.collaboratorName || "",
            examTypeId: item.examTypeId,
            examTypeName: item.examTypeName,
            qtyApplicants: item.qtyApplicants || 0,
          })) || [],
      }

      form.reset(formattedData)
    } else {
      form.reset({
        date: new Date(),
        venue: "",
        description: "",
        notes: "",
        supervisors: [],
        invigilators: [],
        speakings: [],
      })
    }

    // Reset to first tab when dialog opens with new data
    setActiveTab("exam-information")
  }, [initialData, open, form])

  // Handle form submission
  const onSubmit = (data: ExamFormValues) => {
    console.log("DADOS DO FORM SEM FORMATAR: ", data)
    
    // const formattedData = {
    //   ...data,
    //   supervisors: data.supervisors.map((item) => {
    //     //const supervisorName = item.name ? supervisors.find((s) => s.name === item.name)?.name : ""
    //     return {
    //       id: item.id,
    //       collaboratorId: item.value,
    //       collaboratorName: item.collaboratorName,
    //       workedHours: item.workedHours,
    //     }
    //   }),
    //   invigilators: data.invigilators.map((item) => {
    //     //const invigilatorName = item.name ? invigilators.find((s) => s.name === item.name)?.name : ""
    //     return {
    //       id: item.id,
    //       collaboratorId: item.collaboratorId,
    //       collaboratorName: item.collaboratorName,
    //       workedHours: item.workedHours,
    //     }
    //   }),
    //   speakings: data.speakings.map((item) => {
    //     //const speakingName = item.speakingName ? speakings.find((s) => s.name === item.speakingName)?.name : ""
    //     //const examName = item.examName ? examTypes.find((t) => t.name === item.examName)?.name : ""
    //     return {
    //       id: item.id,
    //       collaboratorId: item.collaboratorId,
    //       collaboratorName: item.collaboratorName,
    //       examTypeId: item.examTypeId,
    //       examTypeName: item.examTypeName,
    //       qtyApplicants: item.qtyApplicants,
    //     }
    //   }),
    // }
    onSave(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[600px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Exam" : "New Exam"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-green-600 sticky top-0 z-10">
                <TabsTrigger
                  value="exam-information"
                  className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Exam Information
                </TabsTrigger>
                <TabsTrigger
                  value="supervisors"
                  className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Supervisors
                </TabsTrigger>
                <TabsTrigger
                  value="invigilators"
                  className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Invigilators
                </TabsTrigger>
                <TabsTrigger
                  value="speakings"
                  className="text-white data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Speakings
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="exam-information" className="overflow-y-auto max-h-[400px] pr-2">
                  <ExamInformationForm venuesData={venues} />
                </TabsContent>

                <TabsContent value="supervisors" className="overflow-y-auto max-h-[400px] pr-2">
                  <SupervisorsForm supervisorsData={supervisors} />
                </TabsContent>

                <TabsContent value="invigilators" className="overflow-y-auto max-h-[400px] pr-2">
                  <InvigilatorsForm invigilatorsData={invigilators} />
                </TabsContent>

                <TabsContent value="speakings" className="overflow-y-auto max-h-[400px] pr-2">
                  <SpeakingsForm speakingsData={speakings} examsTypesData={examTypes} />
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex justify-end mt-6 gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit"
                onClick={()=>onSubmit(form.getValues())}

                // onClick={()=>{
                //   console.log("FORM FORÇADO: ", form.getValues())
                // }}
              >Save Exam</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

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
