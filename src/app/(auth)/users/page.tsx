
import { Toaster } from "@/_components/ui/toaster"
import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react"
import { DataTable } from "@/_components/ui/data-table";
import { tableColumns } from "./_components/table-columns";
import { CreateUserButton } from "./_components/create-user-button";
import { getUsers } from "@/app/_data-access/get-users";

export default async function Collaborators() {
  const session = await auth();
    
  if (!session) redirect("/sign-in");

  const users = await getUsers();
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">User Managing</span>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-6">Users</h1>                     
          </div>
          <Suspense fallback={<div>Loading...</div>}>            
            <DataTable columns={tableColumns} data={JSON.parse(JSON.stringify(users))} controlButton={<CreateUserButton />} />
          </Suspense>
          <Toaster />
      </div>
    </DashboardLayout>
  )
}