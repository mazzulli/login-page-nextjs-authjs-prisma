"use client"

import { Card, CardContent } from "@/_components/ui/card"
import { Label } from "@/_components/ui/label"
import { Input } from "@/_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { Button } from "@/_components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/_components/ui/scroll-area"

// Sample data for invigilators
const invigilators = [
  { id: 1, name: "David Wilson" },
  { id: 2, name: "Lisa Taylor" },
  { id: 3, name: "Robert Anderson" },
  { id: 4, name: "Jennifer Martinez" },
]

interface InvigilatorEntry {
  id: number
  name: string
  hours: string
}

interface InvigilatorFormProps {
  data: InvigilatorEntry[]
  onChange: (data: InvigilatorEntry[]) => void
}

export default function InvigilatorForm({ data, onChange }: InvigilatorFormProps) {
  const addInvigilator = () => {
    onChange([...data, { id: Date.now(), name: "", hours: "" }])
  }

  const removeInvigilator = (id: number) => {
    onChange(data.filter((item) => item.id !== id))
  }

  const updateInvigilator = (id: number, field: keyof InvigilatorEntry, value: string) => {
    onChange(data.map((item) => (item.id === id ? { ...item, [field]: value === undefined ? "" : value } : item)))
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Invigilators</h3>
          <Button size="sm" variant="outline" onClick={addInvigilator}>
            <Plus className="h-4 w-4 mr-2" /> Add Invigilator
          </Button>
        </div>

        <ScrollArea className="h-[350px] pr-4">
          {data.map((invigilator) => (
            <div key={invigilator.id} className="mb-6 p-4 border rounded-md relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => data.length > 1 && removeInvigilator(invigilator.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`invigilatorName-${invigilator.id}`}>Invigilator Name</Label>
                  <Select
                    value={invigilator.name}
                    onValueChange={(value) => updateInvigilator(invigilator.id, "name", value)}
                  >
                    <SelectTrigger id={`invigilatorName-${invigilator.id}`}>
                      <SelectValue placeholder="Select an invigilator" />
                    </SelectTrigger>
                    <SelectContent>
                      {invigilators.map((i) => (
                        <SelectItem key={i.id} value={i.name}>
                          {i.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`invigilatorHours-${invigilator.id}`}>Hours Worked</Label>
                  <Input
                    id={`invigilatorHours-${invigilator.id}`}
                    type="number"
                    value={invigilator.hours}
                    onChange={(e) => updateInvigilator(invigilator.id, "hours", e.target.value)}
                    placeholder="Enter hours worked"
                  />
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
