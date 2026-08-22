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
      {result === null && <p>No TXT record.</p>}
      {result && <p>{result.target}</p>}
      {result?.dns.cname && <p>CNAME {result.dns.cname}</p>}
      {result?.dns.ipv4 && <p>A {result.dns.ipv4}</p>}
      {result?.txt && (
        <p>
          TXT {result.txt.domain} {result.txt.value}
        </p>
      )}
    </form>
  );
}
