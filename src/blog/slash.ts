import type { BlogView } from "./view";
import type { BlogForm } from "./form";
import { notFound, redirect } from "next/navigation";

/**
 * Our links are always relative,
 * so they require strict trailing slash behaviour.
 */
export function ensureBlogSlash(params: {
  view: BlogView;
  form: BlogForm;
  lastSegment: string;
}): void {
  const { view, form, lastSegment } = params;
  const segment = encodeURIComponent(lastSegment);

  switch (view.kind) {
    case "file":
      // We don't support custom domain to specific files.
      if (form === "root") notFound();
      if (form === "slash") redirect(`../${segment}`);
      return;
    case "dir":
    case "owner":
      if (form === "bare") redirect(`./${segment}/`);
      return;
  }
}
