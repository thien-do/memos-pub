import type { ReactElement } from "react";
import { ConnField } from "./field";

export function ConnRecord(props: {
  type: string;
  name: string;
  value: string;
}): ReactElement {
  const { type, name, value } = props;

  return (
    <>
      <ConnField label="Type" value={type} />
      <ConnField label="Name" value={name} />
      <ConnField label="Value" value={value} />
    </>
  );
}
