"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "../utils/uploadThing";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
export function TopNav() {
  const router = useRouter();

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
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
