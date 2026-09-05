import type { ReactElement } from "react";
import type { VercelConfigReason } from "@/vercel/config";
import { ConnRecord } from "./record";

export function ConnConfig(props: {
  config: VercelConfigReason;
}): ReactElement {
  const { config } = props;

  return (
    <>
      <p>Point this domain at us.</p>
      <ConnRecord
        type={config.kind === "cname" ? "CNAME" : "A"}
        name={config.name}
        value={config.value}
      />
    </>
  );
}
