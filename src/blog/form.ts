export type BlogForm = "root" | "slash" | "bare";

export function getBlogForm(pathname: string): BlogForm {
  if (pathname === "/") return "root";
  return pathname.endsWith("/") ? "slash" : "bare";
}
