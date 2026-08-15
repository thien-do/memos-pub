import type { ReactElement } from "react";

export function OwnerPage(props: {
  owner: string;
  path: string[];
}): ReactElement {
  const { owner, path } = props;

  return (
    <main>
      <h1>{owner}</h1>
      <p>/{path.join("/")}</p>
    </main>
  );
}
