import { auth } from "@/_lib/auth";
import { signIn } from "@/_lib/auth";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { executeAction } from "@/_lib/executeAction";
import { redirect } from "next/navigation";
import Image from "next/image";
import logo from '@/_assets/logo_CENW.svg'

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 items-center">
      <div className="w-full max-w-xs mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">WINNER IDIOMAS</h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
        {/* Email/Password Sign In */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server";
            await executeAction({
              actionFn: async () => {
                await signIn("credentials", formData);
              },
            });
          }}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="current-password"
          />
          <Button className="w-full" type="submit">
            Access
          </Button>
        </form>    
      </div>
      <Image src={logo} width={800} height={600} alt="Logo" />
    </div>    
  );
};

export default Page;
