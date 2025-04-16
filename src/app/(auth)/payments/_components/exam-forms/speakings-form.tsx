"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Plus, Trash2Icon } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { CollaboratorProps } from "@/app/_data-access/get-collaborators-by-type"
import { ExamValue } from "@prisma/client"

interface Props {
  speakingsData: CollaboratorProps[]
  examsTypesData: ExamValue[]
}

export function SpeakingsForm({ speakingsData, examsTypesData }: Props) {
  const form = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "speakings",
  })

  // Initialize with an empty field if there are none
  useEffect(() => {
    if (fields.length === 0) {
      append({ id: Date.now().toString(), value: "", examTypeValue: "", qtyApplicants: "" })
    }
  }, [fields.length, append])

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-md relative">
          {fields.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => remove(index)}
            >
              <Trash2Icon className="h-4 w-4 text-red-600" />
            </Button>
          )}

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name={`speakings.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speaking</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select speaking" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {speakingsData.map((speaking) => (
                          <SelectItem key={speaking.id} value={speaking.id}>
                            {speaking.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-3">
              <FormField
                control={form.control}
                name={`speakings.${index}.qtyApplicants`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qty Applicants</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-3">
              <FormField
                control={form.control}
                name={`speakings.${index}.examTypeValue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {examsTypesData?.map((item) => (
                          <SelectItem key={item.id} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ id: Date.now().toString(), value: "", examTypeValue: "", qtyApplicants: "" })}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Speaking
      </Button>
    </div>
  )
}
