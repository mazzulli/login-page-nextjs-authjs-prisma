"use client"

import { useFormContext } from "react-hook-form"
import { Calendar } from "@/_components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/_components/ui/popover"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Textarea } from "@/_components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/_lib/utils"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_components/ui/form"
import { VenueProps } from "@/app/_data-access/get-venues"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"

interface Props {
    venuesData: VenueProps[]
}

export function ExamInformationForm({venuesData}: Props) {
  const form = useFormContext()

  return (
    <div className="space-y-4 p-2">
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
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "MM/dd/yyyy") : "Select date"}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="venue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Venue</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value} 
              value={field.value}
              >
              <FormControl>
                <SelectTrigger>
                  <SelectValue 
                    placeholder="Select venue"                             
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {venuesData.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Exam Description</FormLabel>
            <FormControl>
              <Input placeholder="Enter exam description" {...field} />
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
              <Textarea placeholder="Enter additional notes" rows={4} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
