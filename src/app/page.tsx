import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const threads = await db.query.threads.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...threads].map((thread, index) => (
          <div key={thread.id + "-" + index} className="w-48">
            <img src={thread.image} alt="Image logo" width="80px" />
            <div key={thread.id}>{thread.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
