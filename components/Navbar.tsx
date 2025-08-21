import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BadgePlus, LogOut } from "lucide-react";
import { auth, signIn, signOut } from "@/app/auth"; // adjust if your auth file path is different

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-2 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/sam-logo.jpg" alt="logo" width={70} height={20} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <div className="flex gap-4 items-center">
              {/* Create button */}
              <Link href="/startup/create" className="flex items-center gap-1">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              {/* Logout button */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="flex items-center gap-1">
                  <span className="max-sm:hidden">LogOut</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              {/* Avatar linking to user profile */}
              <Link href={`/user/${session.user.id || ""}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                  />
                  <AvatarFallback>
                    {session.user.name?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          ) : (
            // Login button
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
