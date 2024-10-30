"use client";

import Image from "next/image";
import Link from "next/link";
import { type Thread } from "~/app/models/Thread";
import { useThreadsStore } from "~/store";
import { useEffect } from "react";

export default function SidebarThreads({ threads }: { threads: Thread[] }) {
  const initializeThreads = useThreadsStore((state) => state.initializeThreads);
  const threadsStore = useThreadsStore((state) => state.threads);

  useEffect(() => {
    initializeThreads(threads);
  }, [initializeThreads, threads]);

  if (!threads || threads.length === 0) {
    return <div>No threads!</div>;
  }

  return (
    <>
      {threadsStore.map((thread) => (
        <Link
          // onClick={() => {
          //   useThreadsStore.setState({ selectedThread: thread });
          // }}
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
