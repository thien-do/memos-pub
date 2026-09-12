import { z } from "zod";

export const BlogForm = z.enum(["root", "slash", "bare"]);
export type BlogForm = z.infer<typeof BlogForm>;

export function getBlogForm(pathname: string): BlogForm {
  if (pathname === "/") return "root";
  return pathname.endsWith("/") ? "slash" : "bare";
}
