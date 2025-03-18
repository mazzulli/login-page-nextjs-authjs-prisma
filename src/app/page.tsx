import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import userDefaultImage from "@/assets/user-circle.svg";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6 justify-center flex flex-col items-center">
        <p className="text-gray-600">Logado como:</p>
        <p className="font-medium">{session.user?.email}</p>
        <Image
          src={session.user?.image || userDefaultImage}
          alt={session.user?.email || "Usuário"}
          width={100}
          height={100}
          className="rounded-full mt-8"
        />
      </div>

      <SignOut />
    </>
  );
};

export default Page;
