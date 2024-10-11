import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Threads() {
  const threads = await db.query.threads.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {[...threads, ...threads, ...threads].map((thread, index) => (
        <div key={thread.id + "-" + index} className="w-48">
          <img src={thread.image} alt="Image logo" width="80px" />
          <div key={thread.id}>{thread.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Threads />
      </SignedIn>
    </main>
  );
}
