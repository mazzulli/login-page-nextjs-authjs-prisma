"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { toast } from "@/_hooks/use-toast"
import { deleteExam} from "@/_lib/_actions/exams/delete-exam"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/router"

interface DeleteExamDialogContentProps {
    examId: string
}

const DeleteExamDialogContent = ({examId}: DeleteExamDialogContentProps) => {    
    const router = useRouter();
    
    const handleDelete = async () => {
        try {
            await deleteExam({id: examId})
            revalidatePath("/exam-configurations")
            router.reload()
            toast({
                title: "Success!",  
                description: "Exam deleted successfully.",
              })
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",  
                description: "Oh no! Something went wrong.",
            })
        } finally {
            revalidatePath("/exam-configurations")
            router.reload()
        }
    }
    return ( 
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete this exam? This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     );
}
 
export default DeleteExamDialogContent;