import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import Threads from "./_components/threads"; // Import the Threads component from _components

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="">
      {/* <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut> */}
      {/* <SignedIn> */}
      <Threads />
      {/* </SignedIn> */}
    </main>
  );
}
