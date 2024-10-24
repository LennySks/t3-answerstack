import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postsRouter, threadsRouter } from "./routers/threads";
import { userRouter } from "~/server/api/routers/user";

export const appRouter = createTRPCRouter({
  threads: threadsRouter,
  posts: postsRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
