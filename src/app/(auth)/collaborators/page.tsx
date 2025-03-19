import { DashboardLayout } from "@/components/dashboard-layout"

export default function CollaboratorsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Collaborators</h1>
        <p className="mt-2 text-muted-foreground">Manage your collaborators here.</p>
      </div>
    </DashboardLayout>
  )
}

