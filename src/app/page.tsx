import DashboardCard from "@/_components/dashboard-card";
import { DashboardLayout } from "@/_components/dashboard-layout"
import { PieChartUsersType } from "@/_components/pie-chart-users-type";
import { auth } from "@/_lib/auth";
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
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-6 overflow-hidden p-6">
        <PieChartUsersType />
        <DashboardCard />        
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
