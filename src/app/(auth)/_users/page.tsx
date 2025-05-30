import { UserTable } from "@/_components/user-table"
import { Toaster } from "@/_components/ui/toaster"
import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";

export default async function Users() {
  const session = await auth();
    if (!session) redirect("/sign-in");
  return (
    <DashboardLayout>
      <div className="p-6">
          <span className="text-green-600">User Managing</span>
          <h1 className="text-3xl font-bold">Users</h1>
          <UserTable />
          <Toaster />
      </div>
    </DashboardLayout>
  )
}