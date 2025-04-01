"use client"

import { AlertDialog, AlertDialogTrigger } from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { Dialog, DialogTrigger } from "@/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
import { UpsertCollaboratorDialogContent } from "./upsert-collaborator-dialog-content";
import DeleteCollaboratorDialogContent from "./delete-collaborator-dialog-content";
import { useState } from "react";
import { Collaborator } from "@prisma/client";

interface CollaboratorTableDropdownMenuProps {
  collaborator: Collaborator;  
}

const TableDropdownMenu = ({collaborator}: CollaboratorTableDropdownMenuProps) => {     
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
                   onClick={() => navigator.clipboard.writeText(collaborator.id)}
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
             <UpsertCollaboratorDialogContent 
               defaultValues={{
                id: collaborator.id, 
                name: collaborator.name,
                email: collaborator.email,
                phoneNumber: collaborator.phoneNumber,
                document: collaborator.document,
                bankCode: collaborator.bankCode  || "",
                bankName: collaborator.bankName  || "",
                agency: collaborator.agency  || "",
                account: collaborator.account || "",
                meiNumber: collaborator.meiNumber || "",                 
               }}                
               onSuccess={()=> setEditDialogOpen(false)}
             />
             <DeleteCollaboratorDialogContent collaboratorId={collaborator.id} />
           </Dialog>
         </AlertDialog>
       </div>
     )
}
 
export default TableDropdownMenu;