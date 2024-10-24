import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/root";
import { z } from "zod";

export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.query(() => {
    return db.query.posts.findMany();
  }),

  getPostsFromThreadId: publicProcedure
    .input(z.object({ threadId: z.number() }))
    .query(async ({ input }) => {
      try {
        const posts = await db.query.posts.findMany({
          where: (model, { eq }) => eq(model.threadId, input.threadId),
        });
        return posts;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Could not fetch posts for this thread");
      }
    }),
});
