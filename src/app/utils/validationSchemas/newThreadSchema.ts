import { z } from "zod";

// Thread validation schema
export const newThreadSchema = z.object({
  name: z.string().min(3, "Thread name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().optional(),
  banner: z.string().optional(),
});