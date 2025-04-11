"use client"

import { Card, CardContent, CardFooter } from "@/_components/ui/card"
import { Label } from "@/_components/ui/label"
import { Textarea } from "@/_components/ui/textarea"
import { Button } from "@/_components/ui/button"

interface NotesFormProps {
  data: {
    content: string
  }
  onChange: (data: Partial<NotesFormProps["data"]>) => void
  onSubmit: () => void
  onCancel: () => void
}

export default function NotesForm({ data, onChange, onSubmit, onCancel }: NotesFormProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={data.content || ""}
              onChange={(e) => onChange({ content: e.target.value || "" })}
              placeholder="Enter any additional notes or information"
              rows={5}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>Submit Exam</Button>
      </CardFooter>
    </Card>
  )
}
