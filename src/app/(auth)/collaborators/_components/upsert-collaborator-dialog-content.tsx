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
import { useState } from "react"

type FormSchema = z.infer<typeof collaboratorSchema>

const languages = [
  { label: "1 - Banco do Brasil", value: "aa694cc8-a66b-47f7-8f23-00643546feac" },
  { label: "33 - Banco Santander", value: "54d0993b-d3b3-4eff-afde-0e1c0eccb94a" },
  { label: "104 - Caixa Economica", value: "64d7d6c0-addd-4ae8-b6be-b405013b326e" },
  { label: "237 - Banco Bradesco", value: "6054561d-c1d7-4f62-ac88-ea676bddfc7c" },
] as const

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
      agency:  "",
      account:  "",
      meiNumber:  "",
    },
  })
  
  const isEditing = !!defaultValues
  const [openBank, setOpenBank] = useState(false)

  const onSubmit = async (data: FormSchema) => {
    // console.log("Dados do Form: ", data )
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank</FormLabel>
                    <Popover open={openBank} onOpenChange={setOpenBank}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            // role="combobox"
                            className={"text-muted-foreground w-full"}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select bank"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search bank..." />
                          <CommandList>
                            <CommandEmpty>No bank found.</CommandEmpty>
                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue("bankId", language.value)                                    
                                  }}
                                >
                                  {language.label}                                
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