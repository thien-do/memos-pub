import type { ReactElement } from "react";
import { useId } from "react";

export function InputField(props: {
  name: string;
  label: string;
  defaultValue?: string;
  readonly?: boolean;
}): ReactElement {
  const { name, label, defaultValue, readonly } = props;

  const id = useId();

  return (
    <div>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input
        id={id}
        type="text"
        name={name}
        readOnly={readonly}
        defaultValue={defaultValue}
      />
    </div>
  );
}
