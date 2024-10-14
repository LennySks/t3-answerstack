import "server-only";
import { db } from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getThreads() {
  const threads = await db.query.threads.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return threads;
}
