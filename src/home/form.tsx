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
      {result?.type === "error" && <p>{result.reason}</p>}
      {result?.type === "ok" && (
        <>
          <p>{result.target}</p>
          {result.config.cname && <p>CNAME {result.config.cname}</p>}
          {result.config.ipv4 && <p>A {result.config.ipv4}</p>}
          {result.txt && (
            <p>
              TXT {result.txt.domain} {result.txt.value}
            </p>
          )}
        </>
      )}
    </form>
  );
}
