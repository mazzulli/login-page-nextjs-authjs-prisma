"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { School } from "./school-table"
import { useForm } from "react-hook-form"
import { schoolSchema } from "@/lib/models/school-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"
import ViaCepAPI from "@/app/api/viacep";
import { toast } from "@/hooks/use-toast"
import { createSchool } from "@/lib/_actions/school/create-school"
import { Loader2Icon } from "lucide-react"
import { DialogClose } from "@radix-ui/react-dialog"

interface SchoolFormProps {
  formValues: School | null
  isOpen: boolean
  onClose: () => void
  onSave: (formValues: School) => void
  mode: "create" | "edit"
}

export function SchoolForm({ formValues, isOpen, onClose, onSave, mode }: SchoolFormProps) {  
  type FormSchema = z.infer<typeof schoolSchema>
 
  const form = useForm<FormSchema>({
    shouldUnregister: true, // limpa os dados do formulário ao fechar
    resolver: zodResolver(schoolSchema),        
    defaultValues: {      
      id: formValues?.id || "",
      name: formValues?.name || "",
      address: formValues?.address || "",
      number: formValues?.number || "",
      city: formValues?.city || "",
      district: formValues?.district || "",
      state: formValues?.state || "",
      zipCode: formValues?.zipCode || "",
    },
  })
  
  const { setValue } = form

  // search city and state by zipCode
  const fetchAddress = async (value: string) => {
    if (value.length === 8) {
      const result = await ViaCepAPI(value);
      console.log(JSON.stringify(result));
      if(!result.erro) {        
        setValue("address", result.logradouro);
        setValue("city", result.localidade);
        setValue("district", result.bairro);
        setValue("state", result.uf);
      } else {
        toast({
          title: "Zip code not found",
          description: "Zip code not found, please check the number.",          
        })
        setValue("address", "");
        setValue("city", "");
        setValue("district", "");
        setValue("state", "");
      };
    }
  }

  const onSubmit = async (values: FormSchema) => {    
    try {
      await createSchool(values)
      onSave(values)      
      onClose()
      toast({
        title: "School saved",
        description: "The school was saved successfully.",
      })        
    } catch (error) {
      console.error("Error saving school:", error)
      toast({
        title: "Error saving school",
        description: "There was an error saving the school, please try again.",        
      })
    } finally {
      form.reset()      
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
            <DialogTitle>{mode=="edit" ? "Edit user" : "New user"}</DialogTitle>
            <DialogDescription id="user-form">Fill in the form below to {mode=="edit" ? "edit school" : "create a new school"}</DialogDescription>            
          </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fill with school name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Input zip code"
                          {...field}
                          onBlur={(e) => fetchAddress(e.target.value)}                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Input number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input  {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input   {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input  {...field}  />
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
    </Dialog>
  )
}