"use client"

import { Button } from "@/_components/ui/button"
import { Exam } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TableDropdownMenu from "./table-dropdown-menu"
import { Badge } from "@/_components/ui/badge"

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
  },
  {
    accessorKey: "venue",
    header: "Venue",
  },
  {
    accessorKey: "examDescription",
    header: "Exam Description",    
  },
  {
    accessorKey: "isClosed",
    header: "Status",
    cell: ({row}) => {
      const isOpenValue = row.original.isClosed            
      return <Badge variant={isOpenValue ? "default" : "secondary"}>{isOpenValue ? "Open" : "Closed"}</Badge>
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <TableDropdownMenu exam={row.row.original} />
  }, 
]
