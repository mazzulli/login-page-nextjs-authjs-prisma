import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/_components/ui/card"
import { getTotalCollaborators, getTotalExamsClosed, getTotalExamsOpened, getTotalUsers, getTotalVenues } from "@/app/_data-access/get-dashboard-totals"
import { Captions, CaptionsOff, School, Users2Icon } from "lucide-react"

  const DashboardCard = () => {
    const users = getTotalUsers()
    const examsClosed = getTotalExamsClosed()
    const examsOpened = getTotalExamsOpened()
    const collaborators = getTotalCollaborators()
    const venues = getTotalVenues()
    
    return ( 
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-6">Users <Users2Icon /></CardTitle>
                    <CardDescription>System users total</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{users}</p>
                </CardContent>                
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex gap-6">Collaborators <Users2Icon /></CardTitle>
                    <CardDescription>System collaborators total</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{collaborators}</p>
                </CardContent>                
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex gap-6">Venues <School /></CardTitle>
                    <CardDescription>Total of venues</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{venues}</p>
                </CardContent>                
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex gap-6">Closed Exams <CaptionsOff /></CardTitle>
                    <CardDescription>Total of closed exams</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{examsClosed}</p>
                </CardContent>                
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex gap-6">Opened Exams <Captions /></CardTitle>
                    <CardDescription>Total of opened exams</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{examsOpened}</p>
                </CardContent>                
            </Card>
        </div>        
    );
  }
   
  export default DashboardCard;