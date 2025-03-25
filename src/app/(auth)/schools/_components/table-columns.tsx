"use client"

import { Button } from "@/_components/ui/button"
import { Venue } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"

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
    cell: (row) => {
      const venue = row.row.original
      return (        
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(venue.id)}
              >
                Copy Venue ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View venue</DropdownMenuItem>
              <DropdownMenuItem>View venue details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }, 
]
