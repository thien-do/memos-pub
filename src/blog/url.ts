import type { BlogForm } from "./form";

export function getBlogUrl(params: {
  target: string;
  pathname: string;
  form: BlogForm;
}): string {
  const { target, pathname, form } = params;
  const encodedTarget = target.split("/").map(encodeURIComponent).join("/");
  return `/blog/${form}/${encodedTarget}${pathname}`.replace(/\/$/, "");
}
