import { SignOut } from "@/_components/sign-out";
// import { Avatar, AvatarFallback  } from "@/_components/ui/avatar"
import { Button } from "@/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { Settings, User, UserCircle2 } from "lucide-react"
import logoImg from '@/_assets/logo_CENW.svg'
import Image from "next/image"
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";

export async function DashboardHeader() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const user = {
  name: session?.user?.name,
  email: session?.user?.email,
  avatar: session?.user?.image,
  role: "Admin",
 }
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-white px-4 dark:bg-zinc-950 md:px-6">
      <Image className="hidden md:block" src={logoImg} alt="Logo" width={120} height={80} />
      <div className="hidden md:block">        
        <h1 className="text-lg font-semibold">WINNER - Managing Exams Applications</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full border">
              <UserCircle2 height={80} width={80} />
              {/* <Avatar className="h-8 w-8">
                <AvatarImage src={userImg} alt='User photo' />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                <p className="text-xs font-medium text-muted-foreground">{user.role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

