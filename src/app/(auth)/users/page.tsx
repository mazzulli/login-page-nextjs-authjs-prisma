import { UserTable } from "@/components/user-table"
import { Toaster } from "@/components/ui/toaster"
import { DashboardLayout } from "@/components/dashboard-layout"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Users() {
  const session = await auth();
    if (!session) redirect("/sign-in");
  return (
    <DashboardLayout>
      <div className="p-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <UserTable />
          <Toaster />
      </div>
    </DashboardLayout>
  )
}