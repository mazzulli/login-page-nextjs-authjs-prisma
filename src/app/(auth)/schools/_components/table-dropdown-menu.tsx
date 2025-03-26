"use client"

import { AlertDialog, AlertDialogTrigger } from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { Dialog, DialogTrigger } from "@/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
import { UpsertSchoolDialogContent } from "./upsert-school-dialog-content";
import DeleteShcoolDialogContent from "./delete-school-dialog-content";
import { useState } from "react";
import { Venue } from "@prisma/client";

interface SchoolTableDropdownMenuProps {
    venue: Venue;
}

const SchoolTableDropdownMenu = ({venue}: SchoolTableDropdownMenuProps) => {
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const [editDialogOpen, setEditDialogOpen] = useState(false)     
     return (        
       <div className="flex space-x-2">
         <AlertDialog>
           <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="h-8 w-8 p-0">
                   <span className="sr-only">Open menu</span>
                   <MoreHorizontal className="h-4 w-4" />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">              
                 <DropdownMenuItem
                   onClick={() => navigator.clipboard.writeText(venue.id)}
                 >
                   <ClipboardCopyIcon size={16}/>
                   Copy ID
                 </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DialogTrigger asChild>
                   <DropdownMenuItem>
                     <EditIcon size={16}/>
                     Edit
                   </DropdownMenuItem>
                 </DialogTrigger>
                 <AlertDialogTrigger asChild>
                   <DropdownMenuItem>
                       <Trash2Icon size={16}/>
                       Delete
                   </DropdownMenuItem>
                 </AlertDialogTrigger>
               </DropdownMenuContent>
             </DropdownMenu>
             <UpsertSchoolDialogContent 
               defaultValues={{
                 name: venue.name,
                 address: venue.address,
                 city: venue.city,
                 district: venue.district,
                 state: venue.state,
                 number: venue.number,
                 postalCode: venue.postalCode,
                 id: venue.id,
               }} 
               onSuccess={()=> setEditDialogOpen(false)}
             />
             <DeleteShcoolDialogContent venueId={venue.id} />
           </Dialog>
         </AlertDialog>
       </div>
     )
}
 
export default SchoolTableDropdownMenu;