"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { UploadButton } from "../utils/uploadThing";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import PlusSvg from "~/assets/PlusSvg";
export function TopNav() {
  const router = useRouter();

  const { isLoaded, user } = useUser();

  const checkUserInDatabase = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/clerk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error(result.error || "Failed to check or create user");
      }
    } catch (error) {
      console.error("Error checking/creating user in database:", error);
    }
  };

  // Use effect to check the user in the database after sign in
  useEffect(() => {
    if (isLoaded && user) {
      checkUserInDatabase();
    }
  }, [isLoaded, user]);

  return (
    <nav className="font-font-semibold flex w-full items-center justify-between border-b p-4 text-xl">
      <div>
        <Link href={`/`}>Answerstack</Link>
      </div>
      <div className="mx-4 max-w-xl flex-grow">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search Answerstack"
            className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4">
            {/*<UploadButton*/}
            {/*  endpoint="imageUploader"*/}
            {/*  onClientUploadComplete={() => {*/}
            {/*    router.refresh();*/}
            {/*  }}*/}
            {/*/>*/}
            <Button type="button" variant="secondary">
              <div className="flex items-center gap-1">
                <PlusSvg color="black" size={18} /> Create Post
              </div>
            </Button>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
