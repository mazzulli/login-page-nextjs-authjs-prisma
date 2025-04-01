import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";
import ExamCards from "./_components/exam-cards";
import { Suspense } from "react";
import { Toaster } from "@/_components/ui/toaster"
import { getExams } from "@/app/_data-access/get-exams";

export default async function ExamConfigurationsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const exams = await getExams();

  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Test Managing</span>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-6">Tests Configurations</h1>          
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>            
          <ExamCards exams={exams} />
        </Suspense>
        <Toaster />
      </div>
    </DashboardLayout>
  )
}

