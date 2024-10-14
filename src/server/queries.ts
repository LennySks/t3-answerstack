import "server-only";
import { db } from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getThreads() {
  const threads = await db.query.threads.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return threads;
}

export async function getThread(id: number) {
  const thread = await db.query.threads.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!thread) throw new Error("Thread not found");

  return thread;
}
