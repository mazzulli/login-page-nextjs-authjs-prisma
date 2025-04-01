import { signUp } from "@/_lib/actions";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { redirect } from "next/navigation";
import { auth } from "@/_lib/auth";
import Link from "next/link";


const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">WINNER IDIOMS</h1>
      <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>

      {/* Email/Password Sign Up */}
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";          
          const res = await signUp(formData);
          if (res.success) {
            redirect("/sign-in");
          }
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
          autoComplete="new-password"
        />
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
