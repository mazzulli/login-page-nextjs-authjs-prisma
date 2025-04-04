"use client"

import { Button } from "@/_components/ui/button"
import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TableDropdownMenu from "./table-dropdown-menu"
import { PhoneFormat } from "@/_utils/phoneFormat"

export const tableColumns: ColumnDef<User>[] = [  
  {    
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({row})=> {
      const phoneNumber = row.original.phoneNumber
      const formattedPhoneNumber = phoneNumber ? PhoneFormat(phoneNumber) : phoneNumber
      return <span>{formattedPhoneNumber}</span>
    }
  },
  {
    accessorKey: "accessType",
    header: "Acces Type",
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <TableDropdownMenu user={row.row.original} />
  }, 
]
