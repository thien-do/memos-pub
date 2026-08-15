import type { ReactElement } from "react";

export function TenantPage(props: {
  tenant: string;
  path: string[];
}): ReactElement {
  const { tenant, path } = props;

  return (
    <main>
      <h1>{tenant}</h1>
      <p>/{path.join("/")}</p>
    </main>
  );
}
