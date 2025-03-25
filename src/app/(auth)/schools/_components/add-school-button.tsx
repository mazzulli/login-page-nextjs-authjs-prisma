"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/_components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Loader2Icon, PlusCircle } from "lucide-react"
import { schoolSchema } from "@/_lib/models/school-schema"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ViaCepAPI from "@/app/api/viacep"
import { toast } from "@/_hooks/use-toast"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { createSchool } from "@/_lib/_actions/school/create-school"
import { useState } from "react"

type FormSchema = z.infer<typeof schoolSchema>

export const AddSchoolButton = () => {  
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const form = useForm<FormSchema>({
    shouldUnregister: true, // limpa os dados do formulário ao fechar
    resolver: zodResolver(schoolSchema),        
    defaultValues: {      
      id:  "",
      name:  "",
      address:  "",
      number:  "",
      city: "",
      district:  "",
      state:  "",
      postalCode: "",
    },
  })
  
  const { setValue } = form

  const onSubmit = async (data: FormSchema) => {
    // salvar no banco
    try {
      await createSchool(data)
      setDialogIsOpen(false)
      toast({
        title: "School created",  
        description: "School created successfully.",
      })
      }  
    catch (error) {
      console.error(error)
      toast({
        title: "Error",  
        description: "Oh no! Something went wrong.",
      })
    }    
  }

  // search city and state by postalCode
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

  return(
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
      <Button className="bg-green-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Venue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
            <DialogTitle>New venue</DialogTitle>
            <DialogDescription id="user-form">Fill in the form below to create a new venue</DialogDescription>            
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
                  name="postalCode"
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