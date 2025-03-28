import { DashboardLayout } from "@/_components/dashboard-layout"
import { redirect } from "next/navigation";
import { auth } from "@/_lib/auth";

export default async function TestApplicationPage() {
  const session = await auth();
      if (!session) redirect("/sign-in");
  return (
    <DashboardLayout>
      <div className="p-6">
        <span className="text-green-600">Test Managing</span>
        <h1 className="text-3xl font-bold">Testd Application</h1>
        <p className="mt-2 text-muted-foreground">Manage your test applications here.</p>
      </div>
    </DashboardLayout>
  )
}

