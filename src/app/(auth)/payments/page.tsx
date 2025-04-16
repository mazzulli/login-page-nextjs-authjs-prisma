import { Toaster } from "@/_components/ui/toaster"
import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react"
import { getExams } from "@/app/_data-access/get-exams";
import { getCollaboratorsByType } from "@/app/_data-access/get-collaborators-by-type";
import { getExamsPrices } from "@/app/_data-access/get-exams-prices";
import { getVenues } from "@/app/_data-access/get-venues";
import { PaymentContextProvider } from "@/_contexts/PaymentContext";
import { tableColumns } from "./_components/table-columns";
import { DataTable } from "./_components/data-table";

export default async function Exams() {
  const session = await auth();    
  if (!session) redirect("/sign-in");

  const exams = await getExams();
      const venuesList = await getVenues();
      const supervisorsList = await getCollaboratorsByType("Supervisor");
      const invigilatorsList = await getCollaboratorsByType("Invigilator");
      const speakingsList = await getCollaboratorsByType("Speaking");
      const examTypesList = await getExamsPrices();

  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Payment Managing</span>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6">Payments</h1>                     
          </div>
          <Suspense fallback={<div>Loading...</div>}>                   
            <PaymentContextProvider>
              <DataTable 
                      columns={tableColumns} 
                      sortedColumn={"description"} 
                      data={JSON.parse(JSON.stringify(exams))}      
                      examTypes={examTypesList}                   
                      venues={venuesList}
                      supervisors={supervisorsList}
                      invigilators={invigilatorsList}
                      speakings={speakingsList}
                      examTypesList={examTypesList}                                            
                  /> 
            </PaymentContextProvider>
          </Suspense>
          <Toaster />
      </div>
    </DashboardLayout>
  )
}