"use client"

import { AlertDialog, AlertDialogTrigger } from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { Dialog, DialogTrigger } from "@/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
import { UpsertUserDialogContent } from "./upsert-user-dialog-content";
import { useState } from "react";
import { User } from "@prisma/client";
import DeleteUserDialogContent from "./delete-user-dialog-content";

interface UserTableDropdownMenuProps {
  user: User;  
}

function stringToArray(string:string) {
  /**
   * Transforma uma string em um array, utilizando a vírgula como delimitador e removendo os espaços em branco.
   *
   * @param {string} string A string a ser transformada.
   * @returns {string[]} Um array com os elementos da string.
   */
  const items = string.split(',');
  const cleanElement = items.map(item => item.trim());
  return cleanElement;
}

const TableDropdownMenu = ({user}: UserTableDropdownMenuProps) => {     
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
                   onClick={() => navigator.clipboard.writeText(user.id)}
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
             <UpsertUserDialogContent 
               defaultValues={{
                id: user.id, 
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                accessType: user.accessType ? stringToArray(user.accessType) : [],
                secret: user.password || "",              
                isActive: user.isActive   
               }}                
               onSuccess={()=> setEditDialogOpen(false)}
             />
             <DeleteUserDialogContent userId={user.id} />
           </Dialog>
         </AlertDialog>
       </div>
     )
}
 
export default TableDropdownMenu;