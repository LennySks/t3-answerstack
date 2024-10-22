import { HydrateClient } from "~/trpc/server";
import Posts from "~/app/_components/Posts"; // Import the Threads component from _components

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex w-full justify-center">
        <div className="w-full max-w-7xl">
          <Posts />
        </div>
      </main>
    </HydrateClient>
  );
}
