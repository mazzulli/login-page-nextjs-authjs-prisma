import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";
import ExamCards from "./_components/exam-cards";
import { Suspense } from "react";
import { Toaster } from "@/_components/ui/toaster"
import { getExamsPrices } from "@/app/_data-access/get-exams-prices";
import { CreateExamButton } from "./_components/create-exam-button";

export default async function ExamConfigurationsPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const exams = await getExamsPrices();

  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Exam Managing</span>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-16">Exams Configurations</h1>          
          <CreateExamButton />
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>            
          <ExamCards exams={JSON.parse(JSON.stringify(exams))} />
        </Suspense>
        <Toaster />
      </div>
    </DashboardLayout>
  )
}

