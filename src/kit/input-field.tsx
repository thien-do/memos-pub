import type { ReactElement } from "react";
import { useId } from "react";

export function InputField(props: {
  name: string;
  label: string;
  desc?: string;
}): ReactElement {
  const { name, label, desc } = props;

  const id = useId();

  return (
    <div>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <input id={id} type="text" name={name} />
      {desc && <p>{desc}</p>}
    </div>
  );
}
