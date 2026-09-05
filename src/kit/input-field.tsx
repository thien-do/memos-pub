"use client";

import type { ReactElement } from "react";
import { useId } from "react";

export function InputField(props: {
  label: string;
  value: string;
  readonly: boolean;
}): ReactElement {
  const { label, value, readonly } = props;
  const id = useId();

  return (
    <div>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        id={id}
        type="text"
        readOnly={readonly}
        {...(readonly ? { value } : { defaultValue: value })}
      />
    </div>
  );
}
