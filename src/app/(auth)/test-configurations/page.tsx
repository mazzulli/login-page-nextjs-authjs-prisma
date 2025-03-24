import { DashboardLayout } from "@/_components/dashboard-layout"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";

export default async function TestConfigurationsPage() {
  const session = await auth();
      if (!session) redirect("/sign-in");
  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Test Managing</span>
        <h1 className="text-3xl font-bold">Tests Configurations</h1>
        <p className="mt-2 text-muted-foreground">Manage your test configurations here.</p>
      </div>
    </DashboardLayout>
  )
}

