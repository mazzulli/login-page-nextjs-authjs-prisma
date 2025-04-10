
import { Toaster } from "@/_components/ui/toaster"
import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react"
import { DataTable } from "@/_components/ui/data-table";
import { tableColumns } from "./_components/table-columns";
import { CreateExamButton } from "./_components/create-exam-button";
import { getExams } from "@/app/_data-access/get-exams";

export default async function Exams() {
  const session = await auth();    
  if (!session) redirect("/sign-in");
    
  const exams = await getExams();
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Exam Managing</span>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6">Exams</h1>                     
          </div>
          <Suspense fallback={<div>Loading...</div>}>                   
            <DataTable 
              columns={tableColumns} 
              sortedColumn={"examDescription"} 
              data={JSON.parse(JSON.stringify(exams))} 
              controlButton={
                <CreateExamButton 
                  userData={{ id: session.user?.id ? session.user.id : '' , name: session.user?.name ? session.user.name : ''}}
                />
              } />
          </Suspense>
          <Toaster />
      </div>
    </DashboardLayout>
  )
}