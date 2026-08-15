import type { ReactElement } from "react";
import { OwnerPage } from "@/owner/page";

type Props = PageProps<"/owner/[owner]/[[...path]]">;

export default async function Page(props: Props): Promise<ReactElement> {
  const { owner, path } = await props.params;

  return <OwnerPage owner={owner} path={path ?? []} />;
}
