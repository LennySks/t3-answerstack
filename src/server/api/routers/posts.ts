import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/root";
import { z } from "zod";

export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.query(() => {
    return db.query.posts.findMany();
  }),

  getPostsFromThreadId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        return await db.query.posts.findMany({
          where: (model, { eq }) => eq(model.threadId, Number(input)),
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Could not fetch posts for this thread");
      }
    }),
});
