import type { ReactElement } from "react";
import { ConnField } from "./field";

export function ConnPath(): ReactElement {
  return (
    <>
      <p>Add a TXT record for your GitHub path.</p>
      <ConnField label="Type" value="TXT" />
      <ConnField label="Name" value="_memos" />
      <p>
        Set its value to your GitHub path, for example <code>thien-do</code> or{" "}
        <code>thien-do/blog/notes</code>.
      </p>
    </>
  );
}
