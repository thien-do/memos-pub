import { z } from "zod";

export const BlogForm = z.enum(["root", "slash", "bare"]);
export type BlogForm = z.infer<typeof BlogForm>;
