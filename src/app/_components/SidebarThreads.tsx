import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";

// Helper function to simulate delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SidebarThreads() {
  // Add a 10-second delay before calling the API

  const threads = await api.threads.getThreads();

  if (!threads || threads.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {threads.map((thread) => (
        <Link
          key={thread.id}
          href={`/thread/${thread.id}`}
          className="flex items-center space-x-2 rounded p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Image
            src="https://placehold.co/32x32/000000/FFFFFF.svg"
            className="h-8 w-8 rounded-full"
            alt="placeholder image"
            width={32}
            height={32}
          />
          <span>{thread.name}</span>
        </Link>
      ))}
    </>
  );
}
