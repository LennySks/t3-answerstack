// threads.tsx (or any other name you'd prefer)
import Image from "next/image";
import { getThreads } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function Threads() {
  const threads = await getThreads();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {threads.map((thread) => (
        <div key={thread.id} className="w-48">
          <Image
            src={thread.image ?? "idk"}
            style={{ objectFit: "fill" }}
            alt="Image logo"
            width={80}
          />
          <div>{thread.name}</div>
        </div>
      ))}
    </div>
  );
}
