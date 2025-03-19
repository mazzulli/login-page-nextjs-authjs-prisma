import { DashboardLayout } from "@/components/dashboard-layout"

export default function TestConfigurationsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Test Configurations</h1>
        <p className="mt-2 text-muted-foreground">Manage your test configurations here.</p>
      </div>
    </DashboardLayout>
  )
}

