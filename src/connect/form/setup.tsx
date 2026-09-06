import type { ReactElement } from "react";
import {
  ConnectCheckSetupRecord as Record,
  ConnectCheckSetupReason as Reason,
} from "../check";

function Row(props: { record: Record }): ReactElement {
  const { record } = props;

  return (
    <li>
      <dl>
        <dt>Type</dt>
        <dd>{record.type}</dd>
        <dt>Name</dt>
        <dd>{record.name}</dd>
        <dt>Value</dt>
        <dd>{record.value}</dd>
      </dl>
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
