import type { ReactElement } from "react";
import { InputField } from "@/kit/input-field";
import {
  ConnectCheckSetupRecord as Record,
  ConnectCheckSetupReason as Reason,
} from "../check";

function Row(props: { record: Record }): ReactElement {
  const { record } = props;

  return (
    <li>
      <InputField
        readonly
        name="type"
        label="Type"
        defaultValue={record.type}
      />
      <InputField
        readonly
        name="name"
        label="Name"
        defaultValue={record.name}
      />
      <InputField
        readonly
        name="value"
        label="Value"
        defaultValue={record.value}
      />
    </li>
  );
}

export function ConnectFormSetup(props: { reason: Reason }): ReactElement {
  const { reason } = props;

  return (
    <ul>
      {reason.map((record, index) => {
        return <Row key={index} record={record} />;
      })}
    </ul>
  );
}
