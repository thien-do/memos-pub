"use client";

import type { ReactElement } from "react";
import { useActionState, useId, useState } from "react";
import { connectCheckMain } from "../check/main";
import { ConnectFormHow } from "./how";

export function ConnectFormMain(): ReactElement {
  const id = useId();
  const [domain, setDomain] = useState("");
  const [path, setPath] = useState("");
  const state = useActionState(connectCheckMain, undefined);
  const [result, action, pending] = state;

  return (
    <form action={action}>
      <div>
        <div>
          <label htmlFor={`${id}-domain`}>Domain</label>
        </div>
        <input
          id={`${id}-domain`}
          name="domain"
          type="text"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
        />
      </div>
      <div>
        <div>
          <label htmlFor={`${id}-path`}>GitHub path</label>
        </div>
        <input
          id={`${id}-path`}
          name="path"
          type="text"
          value={path}
          onChange={(event) => setPath(event.target.value)}
        />
      </div>
      <p>
        For example <code>thien-do</code> or <code>thien-do/blog/notes</code>.
      </p>
      <button type="submit" disabled={pending}>
        Connect
      </button>
      {result && <ConnectFormHow result={result} />}
    </form>
  );
}
