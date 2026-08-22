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
      {result && !result.ok && <p>{result.reason}</p>}
      {result?.ok && (
        <>
          <p>{result.target}</p>
          {result.config.cname.ok && <p>CNAME {result.config.cname.value}</p>}
          {result.config.apex.ok && <p>A {result.config.apex.value}</p>}
          {result.verify.txt.ok && (
            <p>
              TXT {result.verify.txt.value.domain}{" "}
              {result.verify.txt.value.value}
            </p>
          )}
        </>
      )}
    </form>
  );
}
