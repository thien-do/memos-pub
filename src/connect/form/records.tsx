import type { ReactElement } from "react";
import type { ConnectCheckResultRecord } from "../check/result";
import { InputField } from "@/kit/input-field";

export function ConnectFormRecords(props: {
  records: ConnectCheckResultRecord[];
}): ReactElement {
  const { records } = props;

  return (
    <>
      <p>Add these DNS records.</p>
      {records.map(({ type, name, value }) => (
        <div key={`${type}:${name}:${value}`}>
          <InputField label="Type" value={type} readonly />
          <InputField label="Name" value={name} readonly />
          <InputField label="Value" value={value ?? ""} readonly />
        </div>
      ))}
    </>
  );
}
