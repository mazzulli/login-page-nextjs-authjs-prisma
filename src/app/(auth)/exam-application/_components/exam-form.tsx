"use client"

import { Card, CardContent } from "@/_components/ui/card"
import { Label } from "@/_components/ui/label"
import { Input } from "@/_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { Calendar } from "@/_components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/_components/ui/popover"
import { Button } from "@/_components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/_lib/utils"

// Sample data for schools
const schools = [
  { id: 1, name: "Cambridge School" },
  { id: 2, name: "Oxford Academy" },
  { id: 3, name: "London Language Center" },
  { id: 4, name: "British Council" },
]

interface ExamFormProps {
  data: {
    venue: string
    date: Date
    description: string
  }
  onChange: (data: Partial<ExamFormProps["data"]>) => void
}

// Update the ExamForm component to handle undefined values
export default function ExamForm({ data, onChange }: ExamFormProps) {
  const handleChange = (field: string, value: unknown) => {
    onChange({
      ...data,
      [field]: value === undefined ? (field === "date" ? new Date() : "") : value,
    })
  }

  return (
    <Card className="h-[350px]">
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Select value={data.venue || ""} onValueChange={(value) => handleChange("venue", value)}>
              <SelectTrigger id="venue">
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                {schools.map((school) => (
                  <SelectItem key={school.id} value={school.name}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !data.date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.date ? format(data.date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.date}
                  onSelect={(date) => handleChange("date", date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Exam Description</Label>
            <Input
              id="description"
              value={data.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter exam description"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
