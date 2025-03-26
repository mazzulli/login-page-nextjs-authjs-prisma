"use client"

import { Button } from "@/_components/ui/button"
import { Collaborator } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TableDropdownMenu from "./table-dropdown-menu"

export const tableColumns: ColumnDef<Collaborator>[] = [  
  {    
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Collaborator
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
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "document",
    header: "CPF",
  },
  {
    accessorKey: "bankCode",
    header: "Bank Code",
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
  },
  {
    accessorKey: "agency",
    header: "Agency",
  },
  {
    accessorKey: "account",
    header: "Account",
  },
  {
    accessorKey: "meiNumber",
    header: "MEI",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <TableDropdownMenu collaborator={row.row.original} />
  }, 
]
