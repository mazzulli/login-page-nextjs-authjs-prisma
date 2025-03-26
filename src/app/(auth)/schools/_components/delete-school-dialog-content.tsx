import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { deleteSchool } from "@/_lib/_actions/school/delete-school"

interface DeleteShcoolDialogContentProps {
    venueId: string
}

const DeleteShcoolDialogContent = ({venueId}: DeleteShcoolDialogContentProps) => {
    const handleDelete = async () => {
        try {
            await deleteSchool({id: venueId})
        } catch (error) {
            console.error(error)
        }
    }
    return ( 
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
            Are you sure you want to delete this venue? This action cannot be undone.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     );
}
 
export default DeleteShcoolDialogContent;