import { HydrateClient } from "~/trpc/server";
import Threads from "./_components/threads"; // Import the Threads component from _components

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <HydrateClient>
      <main className="">
        <Threads />
      </main>
    </HydrateClient>
  );
}
