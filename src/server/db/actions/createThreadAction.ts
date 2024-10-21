"use server";

import { z } from "zod";
import { newThreadSchema } from "~/app/utils/validationSchemas/newThreadSchema";
import { api } from "~/trpc/server";

export async function createThreadAction(
  values: z.infer<typeof newThreadSchema>,
): Promise<void> {
  try {
    // Validate the input values using the schema
    const newThreadData = newThreadSchema.parse(values);

    console.log("Received thread data:", newThreadData);

    // Proceed with creating the thread
    await api.threads.createThread(newThreadData);
    console.log("Thread created successfully");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error("Validation failed");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
