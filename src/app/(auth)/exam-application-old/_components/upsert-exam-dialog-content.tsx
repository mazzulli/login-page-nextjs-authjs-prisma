"use client"

import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/_components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { Button } from "@/_components/ui/button"
import { Textarea } from "@/_components/ui/textarea"
import { Input } from "@/_components/ui/input"
import { CalendarIcon, ChevronsUpDown, Loader2Icon } from "lucide-react"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/_hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/_components/ui/popover"
import { examSchema } from "@/_lib/models/exam-schema"
import { upsertExam } from "@/_lib/_actions/exams/upsert-exam"
import { cn } from "@/_lib/utils"
import { enUS } from "date-fns/locale";
import { Calendar } from "@/_components/ui/calendar"
import { useEffect, useState } from "react"
import { Venue } from "@prisma/client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/_components/ui/command"

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
      venue: "",      
      examDescription: "",
      notes: "",      
      date: new Date()      
    },
  })

  const isEditing = !!defaultValues
  const [openVenue, setOpenVenue] = useState(false)
  const [venues, setVenues] = useState<Venue[]>([])
  
  // Fetch venues on component mount
  useEffect(() => {
    const fetchVenues = async () => {
      try {        
        await fetch("api/venues").then((res) => res.json()).then((data) => setVenues(data))                
      } catch (error) {
        toast(
          {
            title: "Ops...",
            description: "Can't fetch venues.",
          }
        )
        console.error("ERROR TO FETCH VENUES: ",error)
      }
    }      
    fetchVenues()
  }, [])

  const onSubmit = async (data: FormSchema) => {    
    console.log("MEUS DADOS:",data)
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
            <DialogTitle>{!isEditing ? "New" : "Edit"} exam</DialogTitle>
            <DialogDescription id="user-form">Fill in the form below to create a new exam</DialogDescription>            
            </DialogHeader>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                        {field.value ? (
                            new Date(field.value).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })                            
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus                      
                        locale={enUS}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}            
            />          
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <Popover open={openVenue} onOpenChange={setOpenVenue}>
                      <PopoverTrigger className={"w-full"} asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={"text-muted-foreground justify-between"}
                          >                            
                            {field.value  ? 
                               venues.find((venue) => venue.name === field.value)?.name : "Select a venue"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-[547]">
                          <CommandInput placeholder="Search bank..." className="w-full p-0" />
                          <CommandList>
                            <CommandEmpty>No venue found.</CommandEmpty>
                            <CommandGroup>
                              {venues.map((venue) => (
                                <CommandItem                                   
                                  value={venue.name}
                                  key={venue.id}
                                  onSelect={() => {                                    
                                    form.setValue("venue", venue.name)                                                                            
                                    setOpenVenue(false);
                                  }}
                                >
                                  {venue.name}                                
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="examDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Description</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Exam title" 
                        {...field}                        
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />               
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="If necessary, fill with some notes..." 
                        rows={3}
                        {...field}                        
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
                onClick={()=>{
                  console.log(form.getValues());
                }}
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