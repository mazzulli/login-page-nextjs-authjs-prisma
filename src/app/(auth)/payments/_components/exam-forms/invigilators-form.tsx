"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Plus, Trash2Icon} from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { CollaboratorProps } from "@/app/_data-access/get-collaborators-by-type"

interface Props {
  invigilatorsData: CollaboratorProps[];
}

export function InvigilatorsForm({invigilatorsData}: Props) {
  const form = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invigilators",
  })

  // Initialize with an empty field if there are none
  useEffect(() => {
    if (fields.length === 0) {
      append({ id: Date.now().toString(), value: "", workedHours: "" })
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
            <div className="col-span-8">
              <FormField
                control={form.control}
                name={`invigilators.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invigilator</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select invigilator" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {invigilatorsData.map((invigilator) => (
                          <SelectItem key={invigilator.id} value={invigilator.id}>
                            {invigilator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name={`invigilators.${index}.workedHours`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Worked Hours</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Hours" {...field} />
                    </FormControl>
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
        onClick={() => append({ id: Date.now().toString(), value: "", workedHours: "" })}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Invigilator
      </Button>
    </div>
  )
}
