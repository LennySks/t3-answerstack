import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postsRouter, threadsRouter } from "./routers/threads";

export const appRouter = createTRPCRouter({
  threads: threadsRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
