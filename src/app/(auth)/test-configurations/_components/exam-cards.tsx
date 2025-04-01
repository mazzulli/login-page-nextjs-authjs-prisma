import { Button } from "@/_components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card"
import { CurrencyFormat } from "@/_utils/currencyFormat"
import { TestValue } from "@prisma/client"
import { EditIcon, Trash2Icon } from "lucide-react"

interface ExamCardsProps {
  exams: TestValue[]
}

export default function ExamCards({ exams }: ExamCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {exams.map((exam) => (
        <Card key={exam.id} className="flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-lg">{exam.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <p className="text-2xl font-bold text-green-600">
              {CurrencyFormat(Number(exam.value))}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
              <Button variant="outline" size="sm">
                <EditIcon className="h-4 w-4 mr-1" /> Editar
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2Icon className="h-4 w-4 mr-1" /> Excluir
              </Button>
            </CardFooter>
        </Card>
      ))}
    </div>
  )
}

