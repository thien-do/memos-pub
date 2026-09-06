import { BlogView } from "./view";
import { headers as getHeaders } from "next/headers";
import { notFound, redirect } from "next/navigation";

/**
 * Our links are always relative,
 * so they require strict trailing slash behaviour.
 */
export async function ensureBlogSlash(view: BlogView): Promise<void> {
  const headers = await getHeaders();
  // Provided by our proxy
  const pathname = headers.get("x-memos-pathname");
  if (pathname === null) throw new Error("Missing pathname header");

  const hasSlash = pathname.endsWith("/");

  switch (view.kind) {
    case "file":
      // We don't support custom domain to specific files.
      if (pathname === "/") notFound();
      if (hasSlash) redirect(pathname.slice(0, -1));
      return;
    case "dir":
    case "owner":
      if (!hasSlash) redirect(`${pathname}/`);
      return;
  }
}
