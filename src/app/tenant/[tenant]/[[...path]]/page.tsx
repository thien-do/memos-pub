import type { ReactElement } from "react";
import { TenantPage } from "@/tenant/page";

type Props = PageProps<"/tenant/[tenant]/[[...path]]">;

export default async function Page(props: Props): Promise<ReactElement> {
  const { tenant, path } = await props.params;

  return <TenantPage tenant={tenant} path={path ?? []} />;
}
