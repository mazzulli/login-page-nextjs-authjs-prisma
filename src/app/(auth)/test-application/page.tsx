import { DashboardLayout } from "@/components/dashboard-layout"

export default function TestApplicationPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Test Application</h1>
        <p className="mt-2 text-muted-foreground">Manage your test applications here.</p>
      </div>
    </DashboardLayout>
  )
}

