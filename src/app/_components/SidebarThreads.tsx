import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";
import { useQuery } from "@tanstack/react-query";

export default async function SidebarThreads() {
  const threads = await api.threads.getThreads();

  return (
    <>
      {threads.map((thread) => (
        <Link
          key={thread.id}
          href={`/thread/${thread.id}`}
          className="flex items-center space-x-2 rounded p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Image
            // src={thread.image ?? "/thread-placeholder.png"}
            src="https://placehold.co/32x32"
            className="h-8 w-8 rounded-full"
            alt={thread.name}
            width={32}
            height={32}
          />
          <span>{thread.name}</span>
        </Link>
      ))}
    </>
  );
}
