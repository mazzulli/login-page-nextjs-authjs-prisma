import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { toast } from "@/_hooks/use-toast"
import { deleteUser } from "@/_lib/_actions/user/delete-user"

interface DeleteUserDialogContentProps {
    userId: string
}

const DeleteUserDialogContent = ({userId}: DeleteUserDialogContentProps) => {
    const handleDelete = async () => {
        try {
            await deleteUser({id: userId})
            toast({
                title: "Success!",  
                description: "User deleted successfully.",
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
                    Are you sure you want to delete this user? This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-700">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
     );
}
 
export default DeleteUserDialogContent;