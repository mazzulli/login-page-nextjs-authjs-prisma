"use client"

import { Card, CardContent } from "@/_components/ui/card"
import { Label } from "@/_components/ui/label"
import { Input } from "@/_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { Button } from "@/_components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/_components/ui/scroll-area"

// Sample data for speaking examiners
const speakingExaminers = [
  { id: 1, name: "Thomas Clark" },
  { id: 2, name: "Patricia Lewis" },
  { id: 3, name: "Christopher Walker" },
  { id: 4, name: "Elizabeth Hall" },
]

interface SpeakingEntry {
  id: number
  name: string
  qtyApplicants: string
}

interface SpeakingFormProps {
  data: SpeakingEntry[]
  onChange: (data: SpeakingEntry[]) => void
}

export default function SpeakingForm({ data, onChange }: SpeakingFormProps) {
  const addSpeakingExaminer = () => {
    onChange([...data, { id: Date.now(), name: "", qtyApplicants: "" }])
  }

  const removeSpeakingExaminer = (id: number) => {
    onChange(data.filter((item) => item.id !== id))
  }

  // Ensure the updateSpeakingExaminer function never sets undefined values
  const updateSpeakingExaminer = (id: number, field: keyof SpeakingEntry, value: string) => {
    onChange(data.map((item) => (item.id === id ? { ...item, [field]: value === undefined ? "" : value } : item)))
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Speaking Examiners</h3>
          <Button size="sm" variant="outline" onClick={addSpeakingExaminer}>
            <Plus className="h-4 w-4 mr-2" /> Add Speaking Examiner
          </Button>
        </div>

        <ScrollArea className="h-[350px] pr-4">
          {data.map((examiner) => (
            <div key={examiner.id} className="mb-6 p-4 border rounded-md relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => data.length > 1 && removeSpeakingExaminer(examiner.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`speakingName-${examiner.id}`}>Speaking Examiner Name</Label>
                  <Select
                    value={examiner.name}
                    onValueChange={(value) => updateSpeakingExaminer(examiner.id, "name", value)}
                  >
                    <SelectTrigger id={`speakingName-${examiner.id}`}>
                      <SelectValue placeholder="Select a speaking examiner" />
                    </SelectTrigger>
                    <SelectContent>
                      {speakingExaminers.map((s) => (
                        <SelectItem key={s.id} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`totalStudents-${examiner.id}`}>Total Students</Label>
                  <Input
                    id={`totalStudents-${examiner.id}`}
                    type="number"
                    value={examiner.qtyApplicants}
                    onChange={(e) => updateSpeakingExaminer(examiner.id, "qtyApplicants", e.target.value)}
                    placeholder="Enter total number of students"
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
