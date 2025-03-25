
import { Toaster } from "@/_components/ui/toaster"
import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react"
import { DataTable } from "@/_components/ui/data-table";
import { schoolTableColumns } from "./_components/table-columns";
import { getSchools } from "@/app/_data-access/school/get-schools";

export default async function Users() {
  const session = await auth();
    
  if (!session) redirect("/sign-in");

  const schools = await getSchools();

  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Venue Managing</span>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6">Venues</h1>                     
          </div>
          <Suspense fallback={<div>Loading...</div>}>            
            <DataTable columns={schoolTableColumns} data={JSON.parse(JSON.stringify(schools))} />
          </Suspense>
          <Toaster />
      </div>
    </DashboardLayout>
  )
}