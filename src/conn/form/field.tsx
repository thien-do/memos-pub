import type { ReactElement } from "react";

export function ConnField(props: {
  label: string;
  value: string;
}): ReactElement {
  const { label, value } = props;

  return (
    <p>
      <label>
        {label} <input type="text" value={value} readOnly />
      </label>
    </p>
  );
}
