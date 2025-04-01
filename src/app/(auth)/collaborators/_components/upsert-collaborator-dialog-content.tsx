"use client"

import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/_components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { ChevronsUpDown, Loader2Icon } from "lucide-react"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/_hooks/use-toast"
import { upsertCollaborator } from "@/_lib/_actions/collaborator/upsert"
import { collaboratorSchema } from "@/_lib/models/collaborator-schema"
import { Popover, PopoverContent, PopoverTrigger } from "@/_components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/_components/ui/command"
import { useEffect, useState } from "react"
import { Banks } from "@prisma/client"

type FormSchema = z.infer<typeof collaboratorSchema>
interface UpsertCollaboratorDialogContentProps {
  defaultValues?: FormSchema
  onSuccess?: ()=>void
}

export const UpsertCollaboratorDialogContent = ({
  defaultValues,
  onSuccess
}: UpsertCollaboratorDialogContentProps) => {    
  const form = useForm<FormSchema>({
    shouldUnregister: true, // limpa os dados do formulário ao fechar
    resolver: zodResolver(collaboratorSchema),        
    defaultValues: defaultValues ?? {      
      id:  "",
      name:  "",
      email:  "",
      document:  "",
      phoneNumber:  "",
      bankId:  "",      
      bankName:  "",
      bankCode: "",
      agency:  "",
      account:  "",
      meiNumber:  "",
    },
  })
  
  const isEditing = !!defaultValues
  const [openBank, setOpenBank] = useState(false)
  const [banks, setBanks] = useState<Banks[]>([])

  // Fetch banks on component mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {        
        await fetch("api/banks").then((res) => res.json()).then((data) => setBanks(data))                
      } catch (error) {
        toast(
          {
            title: "Ops...",
            description: "Can't fetch banks.",
          }
        )
        console.error("ERROR TO FETCH BANKS: ",error)
      }
    }      
    fetchBanks()
  }, [])

  
  
  const onSubmit = async (data: FormSchema) => {    
    try {
      await upsertCollaborator({...data, id: defaultValues?.id })
      onSuccess?.()      
      toast(isEditing ? { 
        title: "Success!",  
        description: "Collaborator updated successfully.",
      } : {title: "Success!",  
        description: "Collaborator created successfully.",})
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
            <DialogTitle>{!isEditing ? "New" : "Edit"} collaborator</DialogTitle>
            <DialogDescription id="user-form">Fill in the form below to create a new collaborator</DialogDescription>            
          </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill collaborator name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="email@email.com" {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 12345-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />               
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">              
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="123.123.123-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full pt-4">
              <span className="font-semibold">Bank Informations</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="bankId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank</FormLabel>
                    <Popover open={openBank} onOpenChange={setOpenBank}>
                      <PopoverTrigger className={"w-full"} asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={"text-muted-foreground justify-between"}
                          >
                            {field.value ? banks.find((bank) => bank.id === field.value)?.name : "Select a bank"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-[547]">
                          <CommandInput placeholder="Search bank..." className="w-full p-0" />
                          <CommandList>
                            <CommandEmpty>No bank found.</CommandEmpty>
                            <CommandGroup>
                              {banks.map((bank) => (
                                <CommandItem                                   
                                  value={bank.code + " - " + bank.name}
                                  key={bank.id}
                                  onSelect={() => {
                                    form.setValue("bankId", bank.id)                                              
                                    form.setValue("bankCode", String(bank.code))
                                    form.setValue("bankName", bank.name)
                                    setOpenBank(false);
                                  }}
                                >
                                  {bank.name}                                
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
            </div>            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-10">
              <FormField
                control={form.control}
                name="agency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agency</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-0" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <FormControl>
                      <Input placeholder="00000000-0" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meiNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MEI</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0000-00" {...field}  />
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