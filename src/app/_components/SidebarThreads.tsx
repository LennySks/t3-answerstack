import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function SidebarThreads() {
  const threads = await api.threads.getThreads();

  if (!threads || threads.length === 0) {
    return <div>No threads!</div>;
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

function reformatThreadName(input: string): string {
  return input.toLowerCase().replace(/ /g, "_");
}
