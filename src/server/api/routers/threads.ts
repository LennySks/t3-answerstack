// src/server/trpc/router/threads.ts
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type CreateThread } from "~/server/dto/CreateThread";
import { db } from "~/server/db/root";
import { threads } from "~/server/db/posts";
import { Visibility } from "~/app/models/Visibility";

export const threadsRouter = createTRPCRouter({
  getThreads: publicProcedure.query(({}) => {
    return db.query.threads.findMany();
  }),

  getThreadById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return db.query.threads.findFirst({
        where: (model, { eq }) => eq(model.id, input.id),
      });
    }),

  createThread: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(20),
        description: z.string().min(3).max(500),
        image: z.string().optional(),
        banner: z.string().optional(),
        visibility: z.enum([Visibility.PUBLIC, Visibility.PRIVATE]),
      }),
    )
    .mutation(async ({ input }) => {
      const newThread: CreateThread = {
        name: input.name,
        description: input.description,
        image: input.image,
        banner: input.banner,
        visibility: input.visibility,
      };

      return db.insert(threads).values(newThread);
    }),
});

export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.query(() => {
    return db.query.posts.findMany();
  }),
});
