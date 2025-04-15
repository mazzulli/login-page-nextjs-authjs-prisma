"use client"

import { AlertDialog, AlertDialogTrigger } from "@/_components/ui/alert-dialog";
import { Button } from "@/_components/ui/button";
import { Dialog, DialogDescription, DialogTrigger } from "@/_components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { ClipboardCopyIcon, EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
import { UpsertExamDialogContent } from "./upsert-exam-dialog-content";
import { useState } from "react";
import { Exam } from "@prisma/client";
import DeleteExamDialogContent from "./delete-exam-dialog-content";

interface ExamTableDropdownMenuProps {
  exam: Exam;  
}

const TableDropdownMenu = ({exam}: ExamTableDropdownMenuProps) => {     

     const [editDialogOpen, setEditDialogOpen] = useState(false)     
     return (        
       <div className="flex space-x-2">
         <AlertDialog>
           <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
             <DialogDescription/>
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="h-8 w-8 p-0">
                   <span className="sr-only">Open menu</span>
                   <MoreHorizontal className="h-4 w-4" />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">              
                 <DropdownMenuItem
                   onClick={() => navigator.clipboard.writeText(exam.id)}
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
             <UpsertExamDialogContent 
               defaultValues={{
                id: exam.id, 
                examDescription: exam.examDescription,
                date: exam.date,
                notes: exam.notes || "",                
               }}                
               onSuccess={()=> setEditDialogOpen(false)}               
             />
             <DeleteExamDialogContent examId={exam.id} />
           </Dialog>
         </AlertDialog>
       </div>
     )
}
 
export default TableDropdownMenu;