import type { ReactElement } from "react";
import { useActionState } from "react";
import { checkConnectAction } from "../check";
import { ConnectFormHow } from "./how";
import { InputField } from "@/kit/input-field";

export function ConnectFormBox(): ReactElement {
  const state = useActionState(checkConnectAction, undefined);
  const [result, action, pending] = state;

  return (
    <form action={action}>
      <InputField name="hostname" label="Domain" />
      <p>
        For example <code>thien.do</code> or <code>memos.thien.do</code>.
      </p>
      <InputField name="path" label="GitHub path" />
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
