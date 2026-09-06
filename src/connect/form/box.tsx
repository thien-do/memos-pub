"use client";

import type { ReactElement } from "react";
import { useActionState } from "react";
import { checkConnectAction } from "../check";
import { ConnectFormResult } from "./result";
import { InputField } from "@/kit/input-field";

export function ConnectFormBox(): ReactElement {
  const state = useActionState(checkConnectAction, undefined);
  const [result, action, pending] = state;

  return (
    <form action={action} onReset={(event) => event.preventDefault()}>
      <InputField
        name="hostname"
        label="Domain"
        desc="e.g., “memos.thien.do”"
      />
      <InputField
        name="path"
        label="GitHub repo"
        desc="e.g., “thien-do/memos”"
      />
      <button type="submit" disabled={pending}>
        Connect
      </button>
      {result && <ConnectFormResult result={result} />}
    </form>
  );
}
