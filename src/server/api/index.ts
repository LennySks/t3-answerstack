import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { threadsRouter } from "./routers/threads";

export const appRouter = createTRPCRouter({
  threads: threadsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
