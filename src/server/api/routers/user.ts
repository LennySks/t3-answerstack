import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/root";
import { type CreateUser } from "~/server/dto/CreateUser";
import { z } from "zod";
import { users } from "~/server/db/posts";
import { eq } from "drizzle-orm";

async function checkUsernameExists(username: string, userId?: string) {
  const existingUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.username, username),
  });

  // If a user ID is provided, exclude that user from the check (useful for updates)
  if (existingUser && existingUser.id !== userId) {
    throw new Error("Username already exists");
  }
}

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(() => {
    return db.query.users.findMany();
  }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return db.query.users.findFirst({
        where: eq(users.id, input.id),
      });
    }),

  createUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string().min(4).max(32),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      await checkUsernameExists(input.username);

      const newUser: CreateUser = {
        id: input.id,
        username: input.username,
        email: input.email,
      };

      return db.insert(users).values(newUser);
    }),

  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string().min(4).max(32).optional(),
        profilePicture: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.username) {
        await checkUsernameExists(input.username, input.id);
      }
      return db.update(users).set(input).where(eq(users.id, input.id));
    }),
});
