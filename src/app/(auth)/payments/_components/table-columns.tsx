"use client"

import { Button } from "@/_components/ui/button"
import { Exam } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TableDropdownMenu from "./table-dropdown-menu"
import { Badge } from "@/_components/ui/badge"
import dateFormat from "@/_utils/dateFormat"

export const tableColumns: ColumnDef<Exam>[] = [  
  {    
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
    const date = row.original.date
    return dateFormat(date)
    }
  },
  {
    accessorKey: "venue",
    header: "Venue",
  },
  {
    accessorKey: "description",
    header: "Exam Description",    
  },
  {
    accessorKey: "isClosed",
    header: "Status",
    cell: ({row}) => {
      const isClosedValue = row.original.isClosed            
      return <Badge variant={isClosedValue ? "default" : "secondary"}>{!isClosedValue ? "Open" : "Closed"}</Badge>
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <TableDropdownMenu exam={row.row.original} />
  }, 
]
