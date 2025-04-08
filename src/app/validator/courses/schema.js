import { z } from "zod";

export const CoursePayloadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tier: z.number().int().min(0).max(1),
});
