"use client"
import { Card, CardContent } from "@/_components/ui/card"
import { Label } from "@/_components/ui/label"
import { Input } from "@/_components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select"
import { Button } from "@/_components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { ScrollArea } from "@/_components/ui/scroll-area"

// Sample data for supervisors
const supervisors = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Emma Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Sarah Davis" },
]

interface SupervisorEntry {
  id: number
  name: string
  hours: string
}

interface SupervisorFormProps {
  data: SupervisorEntry[]
  onChange: (data: SupervisorEntry[]) => void
}

export default function SupervisorForm({ data, onChange }: SupervisorFormProps) {
  const addSupervisor = () => {
    onChange([...data, { id: Date.now(), name: "", hours: "" }])
  }

  const removeSupervisor = (id: number) => {
    onChange(data.filter((item) => item.id !== id))
  }

  // Ensure the updateSupervisor function never sets undefined values
  const updateSupervisor = (id: number, field: keyof SupervisorEntry, value: string) => {
    onChange(data.map((item) => (item.id === id ? { ...item, [field]: value === undefined ? "" : value } : item)))
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Supervisors</h3>
          <Button size="sm" variant="outline" onClick={addSupervisor}>
            <Plus className="h-4 w-4 mr-2" /> Add Supervisor
          </Button>
        </div>

        <ScrollArea className="h-[350px] pr-4">
          {data.map((supervisor) => (
            <div key={supervisor.id} className="mb-6 p-4 border rounded-md relative">
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => data.length > 1 && removeSupervisor(supervisor.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`supervisorName-${supervisor.id}`}>Supervisor Name</Label>
                  <Select
                    value={supervisor.name}
                    onValueChange={(value) => updateSupervisor(supervisor.id, "name", value)}
                  >
                    <SelectTrigger id={`supervisorName-${supervisor.id}`}>
                      <SelectValue placeholder="Select a supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {supervisors.map((s) => (
                        <SelectItem key={s.id} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`supervisorHours-${supervisor.id}`}>Hours Worked</Label>
                  <Input
                    id={`supervisorHours-${supervisor.id}`}
                    type="number"
                    value={supervisor.hours}
                    onChange={(e) => updateSupervisor(supervisor.id, "hours", e.target.value)}
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
