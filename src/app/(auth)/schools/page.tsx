import { Toaster } from "@/components/ui/toaster"
import { DashboardLayout } from "@/components/dashboard-layout"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SchoolTable } from "@/components/school-table"
import { Suspense } from "react"

export default async function Users() {
  const session = await auth();
    if (!session) redirect("/sign-in");
  return (
    <DashboardLayout>
      <div className="p-6">
          <h1 className="text-3xl font-bold">Schools</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <SchoolTable />
          </Suspense>
          <Toaster />
      </div>
    </DashboardLayout>
  )
}