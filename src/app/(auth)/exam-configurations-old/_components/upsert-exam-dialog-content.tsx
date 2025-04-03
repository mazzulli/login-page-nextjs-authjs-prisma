"use client"

import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/_components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Loader2Icon } from "lucide-react"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/_hooks/use-toast"
import { upsertExam } from "@/_lib/_actions/exams/upsert-exam"
import { examSchema } from "@/_lib/models/exam-schema"
import CurrencyInputFormat from "@/_components/currency-input"


type FormSchema = z.infer<typeof examSchema>
interface UpsertExamDialogContentProps {
  defaultValues?: FormSchema
  onSuccess?: ()=>void
}

export const UpsertExamDialogContent = ({
  defaultValues,
  onSuccess
}: UpsertExamDialogContentProps) => {    
  const form = useForm<FormSchema>({
    shouldUnregister: true, // limpa os dados do formulário ao fechar
    resolver: zodResolver(examSchema),        
    defaultValues: defaultValues ?? {      
      id:  "",
      name:  "",
      price:  "",
    },
  })
  
  const isEditing = !!defaultValues  

  const onSubmit = async (data: FormSchema) => {    
    try {
      await upsertExam({...data, id: defaultValues?.id })
      onSuccess?.()      
      toast(isEditing ? { 
        title: "Success!",  
        description: "Exam updated successfully.",
      } : {title: "Success!",  
        description: "Exam created successfully.",})
      }  
    catch (error:unknown) {      
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        toast({
          title: "Error",  
          description: "Oh no! " + error.message,
        })
      } else {
        console.error("An unknown error occurred:", error);        
      }      
    }    
  }
  
  return(
      <DialogContent className="sm:max-w-[600px]">
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
            <DialogTitle>{!isEditing ? "New" : "Edit"} exam</DialogTitle>
            <DialogDescription id="user-form">Fill in the form below to create a new exam</DialogDescription>            
          </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill exam name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                    <Input
                      placeholder="R$ 0,00"
                      value={CurrencyInputFormat(String(value))}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        onChange(rawValue);
                      }}
                    />                    
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />              
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button                 
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin mr-2" />
                )}
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent> 
  )
}