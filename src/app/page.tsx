import { DashboardLayout } from "@/components/dashboard-layout"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard. Select an option from the sidebar to get started.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-lg font-medium">Quick Stats</h3>
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Users</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Schools</span>
                <span className="font-medium">56</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Test Applications</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <div className="mt-4 space-y-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium">New user registered</span>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Test configuration updated</span>
                <span className="text-xs text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">New school added</span>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-lg font-medium">System Status</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Database: Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">API: Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}





// import { auth } from "@/lib/auth";
// import Image from "next/image";
// import { redirect } from "next/navigation";
// import userDefaultImage from "@/assets/user-circle.svg";

// const Page = async () => {
//   const session = await auth();
//   if (!session) redirect("/sign-in");

//   return (
//     <>
//       <div className="bg-gray-100 rounded-lg p-4 text-center mb-6 justify-center flex flex-col items-center">
//         <p className="text-gray-600">Logado como:</p>
//         <p className="font-medium">{session.user?.email}</p>
//         <Image
//           src={session.user?.image || userDefaultImage}
//           alt={session.user?.email || "Usuário"}
//           width={100}
//           height={100}
//           className="rounded-full mt-8"
//         />
//       </div>

//       <SignOut />
//     </>
//   );
// };

// export default Page;
