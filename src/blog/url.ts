export type BlogUrlForm = "root" | "slash" | "bare";

export function getBlogUrlForm(pathname: string): BlogUrlForm {
  if (pathname === "/") return "root";
  return pathname.endsWith("/") ? "slash" : "bare";
}

export function getBlogRewritePath(params: {
  target: string;
  pathname: string;
  form: BlogUrlForm;
}): string {
  const { target, pathname, form } = params;
  const [owner, ...prefix] = target.split("/").map(encodeURIComponent);
  const base = ["", "blog", owner, form, ...prefix].join("/");
  return `${base}${pathname}`.replace(/\/$/, "");
}
