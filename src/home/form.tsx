"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { checkDomainAction } from "./action";

export function HomeForm(): ReactElement {
  const state = useActionState(checkDomainAction, undefined);
  const [result, action, pending] = state;

  return (
    <form action={action}>
      <label>
        Domain
        <input name="host" type="text" placeholder="thien.do" />
      </label>
      <button type="submit" disabled={pending}>
        Continue
      </button>
      {result && (
        <button type="submit" name="intent" value="verify" disabled={pending}>
          Check again
        </button>
      )}
      {result === null && <p>No TXT record.</p>}
      {result && <p>{result.target}</p>}
      {result?.config.cname && <p>CNAME {result.config.cname}</p>}
      {result?.config.apex && <p>A {result.config.apex}</p>}
      {result?.verify.txt && (
        <p>
          TXT {result.verify.txt.domain} {result.verify.txt.value}
        </p>
      )}
    </form>
  );
}
