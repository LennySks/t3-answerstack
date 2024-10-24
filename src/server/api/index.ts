import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { threadsRouter } from "./routers/threads";
import { userRouter } from "~/server/api/routers/user";
import { postsRouter } from "~/server/api/routers/posts";

export const appRouter = createTRPCRouter({
  threads: threadsRouter,
  posts: postsRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
