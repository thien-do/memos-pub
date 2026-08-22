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
      {result === null && <p>Can't use this domain.</p>}
      {result?.kind === "memos" && (
        <p>
          Add a TXT record at <code>_memos.{result.host}</code>. Set it to your
          GitHub path, for example <code>thien-do</code> or{" "}
          <code>thien-do/blog/notes</code>.
        </p>
      )}
      {result?.kind === "ready" && (
        <>
          <p>{result.target}</p>
          {result.config.cname && <p>CNAME {result.config.cname}</p>}
          {result.config.apex && <p>A {result.config.apex}</p>}
          {result.verify.txt && (
            <p>
              TXT {result.verify.txt.domain} {result.verify.txt.value}
            </p>
          )}
        </>
      )}
    </form>
  );
}
