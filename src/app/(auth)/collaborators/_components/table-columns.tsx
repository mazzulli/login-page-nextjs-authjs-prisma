"use client"

import { Button } from "@/_components/ui/button"
import { Collaborator } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import TableDropdownMenu from "./table-dropdown-menu"
import { PhoneFormat } from "@/_utils/phoneFormat"
import { CPFFormat } from "@/_utils/cpfFormat"
import { CNPJFormat } from "@/_utils/cnpjFormat"

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
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({row})=> {
      const phoneNumber = row.original.phoneNumber
      const formattedPhoneNumber = PhoneFormat(phoneNumber)
      return <span>{formattedPhoneNumber}</span>
    }
  },
  {
    accessorKey: "document",
    header: "CPF",
    cell: ({row}) => {
      const document = row.original.document
      const formattedDocument = CPFFormat(document)
      return <span>{formattedDocument}</span>
    }
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
    cell: ({row}) => {
      const meiNumber = row.original.meiNumber
      const formattedMeiNumber = CNPJFormat(meiNumber)
      return <span>{formattedMeiNumber}</span>
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <TableDropdownMenu collaborator={row.row.original} />
  }, 
]
