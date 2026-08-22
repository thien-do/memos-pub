"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { connectDomainAction } from "./action";

export function HomeForm(): ReactElement {
  const state = useActionState(connectDomainAction, undefined);
  const [result, action, pending] = state;

  return (
    <form action={action}>
      <label>
        Domain
        <input name="domain" type="text" placeholder="example.com" />
      </label>
      <button type="submit" disabled={pending}>
        Connect
      </button>
      <pre>{JSON.stringify(result)}</pre>
    </form>
  );
}
