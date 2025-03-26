import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { deleteSchool } from "@/_lib/_actions/school/delete-school"
import { toast } from "@/_hooks/use-toast"

interface DeleteCollaboratorDialogContentProps {
    collaboratorId: string
}

const DeleteCollaboratorDialogContent = ({collaboratorId}: DeleteCollaboratorDialogContentProps) => {
    const handleDelete = async () => {
        try {
            await deleteSchool({id: collaboratorId})
            toast({
                title: "Collaborator deleted",  
                description: "Collaborator deleted successfully.",
              })
        } catch (error) {
            console.error(error)
            toast({
                title: "Error",  
                description: "Oh no! Something went wrong.",
            })
        }
    }
    return ( 
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            Are you sure you want to delete this collaborator? This action cannot be undone.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     );
}
 
export default DeleteCollaboratorDialogContent;