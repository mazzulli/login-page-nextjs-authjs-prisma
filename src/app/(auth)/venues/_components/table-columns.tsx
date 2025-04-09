"use client"

import { Button } from "@/_components/ui/button"
import { Venue } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import SchoolTableDropdownMenu from "./table-dropdown-menu"

export const schoolTableColumns: ColumnDef<Venue>[] = [  
  {    
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Venue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <SchoolTableDropdownMenu venue={row.row.original} />
  }, 
]
