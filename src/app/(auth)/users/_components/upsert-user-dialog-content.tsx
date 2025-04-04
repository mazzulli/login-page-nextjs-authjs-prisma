"use client"

import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/_components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { ChevronsUpDown, Loader2Icon } from "lucide-react"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/_hooks/use-toast"
import { userSchema } from "@/_lib/models/user-schema"
import { upsertUser } from "@/_lib/_actions/user/upsert-user"
import * as React from "react"
// import { Popover, PopoverContent, PopoverTrigger } from "@/_components/ui/popover"
import { useState } from "react"
import { cn } from "@/_lib/utils"
// import { Checkbox } from "@/_components/ui/checkbox"
import { Switch } from "@/_components/ui/switch"
// import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/_components/ui/command"

type FormSchema = z.infer<typeof userSchema>

interface UpsertUserDialogContentProps {
  defaultValues?: FormSchema
  onSuccess?: ()=>void
}

export const UpsertUserDialogContent = ({
  defaultValues,
  onSuccess
}: UpsertUserDialogContentProps) => {    
  const form = useForm<FormSchema>({
    shouldUnregister: true, // limpa os dados do formulário ao fechar
    resolver: zodResolver(userSchema),        
    defaultValues: defaultValues ?? {      
      id:  "",
      name:  "",
      email:  "",
      phoneNumber:  "",
      secret:  "",
      accessType:  [],
      isActive: true,
    },
  })
  
  const isEditing = !!defaultValues    
  const [open, setOpen] = useState(false)
 
  const onSubmit = async (data: FormSchema) => {      
    try {
      await upsertUser({...data, id: defaultValues?.id })
      onSuccess?.()      
      toast(isEditing ? { 
        title: "Success!",  
        description: "User updated successfully.",
      } : {title: "Success!",  
        description: "User created successfully.",})
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
 
  // Format phone on change values
  function formatPhoneNumber(value: string) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Apply the formatting based on the number of digits
    if (digits.length <= 2) {
      return digits
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
    }
  }

  const roles = [
    { label: "Administrator", value: "Administrator" },
    { label: "Supervisor", value: "Supervisor" },
    { label: "Invigilator", value: "Invigilator" },
    { label: "Speaking", value: "Speaking" },
  ]
  
  return(
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
             <DialogTitle>{!isEditing ? "New" : "Edit"} user</DialogTitle>
              <DialogDescription id="user-form">Fill in the form below to create a new user</DialogDescription>            
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill user name" {...field} />
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
                      <Input 
                        placeholder="(11) 12345-1234" 
                        {...field}
                        value={formatPhoneNumber(field.value)}
                        onChange={(e) => {
                          // Get only digits from the input
                          const digits = e.target.value.replace(/\D/g, "")
                          // Limit to 11 digits
                          const limitedDigits = digits.slice(0, 11)
                          // Update the field with raw digits
                          field.onChange(limitedDigits)
                        }}
                        inputMode="numeric"
                         />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />               
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormField
                control={form.control}
                name="secret"                
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="********" 
                        {...field}  
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="accessType"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Access Type</FormLabel>
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                      <FormControl>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                              "w-full justify-between",
                              !field.value.length && "text-muted-foreground"
                            )}                            
                          >
                            {field.value.length
                              ? `${field.value.length} selected`
                              : "Select roles"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                      </FormControl>
                      <DropdownMenuContent className="sm:w-[547]">
                        <DropdownMenuLabel>Roles</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        debugger
                        {                          
                        roles.map((role) => (                                             
                          <DropdownMenuCheckboxItem
                            key={role.value}
                            checked={field.value.includes(role.value)}
                            onCheckedChange={(checked) => {                              
                              const currentValues = [...field.value]
                              
                              if (checked) {
                                if (!currentValues.includes(role.value)) {
                                  field.onChange([...currentValues, role.value])
                                }
                              } else {
                                field.onChange(
                                  currentValues.filter((value) => value !== role.value)
                                )
                              }
                            }}
                          >
                            {role.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormDescription>
                      Select one or more roles for the user.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pb-10">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Is active?</FormLabel>
                      <FormDescription>
                        Allow user to log in.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField                
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex gap-2 space-y-0 items-end justify-end">
                    <FormLabel>
                      Is active?
                    </FormLabel>                    
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}                        
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            {/* <FormField
              control={form.control}
              name="accessType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Access Type</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {field.value.length ? `${field.value.length} selected` : "Select roles"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="sm:w-[547]">
                        <CommandList>
                          <CommandEmpty>No roles found.</CommandEmpty>
                          <CommandGroup>
                            {roles.map((role) => (
                              <CommandItem
                                key={role.value}
                                onSelect={() => {
                                  const currentValues = field.value
                                  const newValues = currentValues.includes(role.value) // already exist
                                    ? currentValues.filter((value) => value !== role.value) // true
                                    : [...currentValues,  role.value] // false
    
                                    field.onChange(newValues)
                                }}
                              >
                                <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary 
                                ${field.value.includes(role.value) ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"}`}>
                                  <Check className="h-3 w-3" />
                                </div>
                                {role.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Select one or more roles for the user.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />             */}
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