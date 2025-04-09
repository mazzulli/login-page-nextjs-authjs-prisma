import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/_components/ui/alert-dialog"
import { deleteVenue } from "@/_lib/_actions/venue/delete-venue"
import { toast } from "@/_hooks/use-toast"

interface DeleteShcoolDialogContentProps {
    venueId: string
}

const DeleteShcoolDialogContent = ({venueId}: DeleteShcoolDialogContentProps) => {
    const handleDelete = async () => {
        try {
            await deleteVenue({id: venueId})
            toast({
                title: "Success!",  
                description: "Venue deleted successfully.",
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