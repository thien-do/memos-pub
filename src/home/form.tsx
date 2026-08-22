"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { checkDomainAction } from "./action";

export function HomeForm(): ReactElement {
  const [target, action, pending] = useActionState(
    checkDomainAction,
    undefined,
  );

  return (
    <form action={action}>
      <label>
        Domain
        <input name="host" type="text" placeholder="thien.do" />
      </label>
      <button type="submit" disabled={pending}>
        Continue
      </button>
      {typeof target === "string" && <p>{target}</p>}
      {target === null && <p>No TXT record.</p>}
    </form>
  );
}
