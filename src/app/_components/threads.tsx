// threads.tsx
import Image from "next/image";
import Link from "next/link";
import { getThreads } from "~/server/api/ThreadsAPI";

export const dynamic = "force-dynamic";

export default async function Threads() {
  const threads = await getThreads();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {threads.map((thread) => (
        <div key={thread.id} className="w-48">
          {/* Use formatted name in the URL */}
          <Link href={`/threads/${formatName(thread.name)}`}>
            <Image
              src={thread.image ?? "idk"}
              style={{ objectFit: "fill" }}
              alt="Image logo"
              width={80}
              height={80}
            />
          </Link>
          {/* Use original name in the display */}
          <div>{thread.name}</div>
        </div>
      ))}
    </div>
  );
}

function formatName(name: string): string {
  return name.replace(/\s+/g, "_").toLowerCase();
}
