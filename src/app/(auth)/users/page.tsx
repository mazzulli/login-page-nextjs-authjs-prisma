import { UserTable } from "@/components/user-table"
import { Toaster } from "@/components/ui/toaster"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">User Sign Up</h1>
          <UserTable />
          <Toaster />
        </div>
      </div>
    </DashboardLayout>
  )
}