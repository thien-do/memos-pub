import type { ReactElement } from "react";
import { BlogPage } from "@/blog/page";

type Props = PageProps<"/blog/[owner]/[[...path]]">;

export default async function Page(props: Props): Promise<ReactElement> {
  const { owner, path } = await props.params;

  return <BlogPage owner={owner} path={path ?? []} />;
}
