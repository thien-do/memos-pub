import type { ReactElement } from "react";
import type { VercelDetailReason } from "@/vercel/detail";
import { ConnRecord } from "./record";

export function ConnVerify(props: {
  verify: VercelDetailReason;
}): ReactElement {
  const { verify } = props;

  return (
    <>
      <p>Prove you own this domain.</p>
      {verify.map((item) => (
        <ConnRecord
          key={item.value}
          type={item.type}
          name={item.domain}
          value={item.value}
        />
      ))}
    </>
  );
}
