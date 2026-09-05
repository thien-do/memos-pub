import type { ReactElement } from "react";
import type { ConnCheckResult } from "../check";
import { ConnConfig } from "./config";
import { ConnField } from "./field";
import { ConnPath } from "./path";
import { ConnVerify } from "./verify";

export function ConnInstruction(props: {
  result: ConnCheckResult;
}): ReactElement {
  const { result } = props;

  switch (result.type) {
    case "success": {
      return (
        <>
          <p>This domain is connected.</p>
          <ConnField label="GitHub path" value={result.path} />
        </>
      );
    }
    case "clean": {
      switch (result.reason) {
        case "parse":
          return <p>Enter a domain like example.com.</p>;
        case "unsafe":
          return <p>That domain is not supported.</p>;
      }
    }
    case "get": {
      switch (result.reason) {
        case "apex-limit":
          return <p>This domain already has three names here.</p>;
      }
    }
    case "setup": {
      const { path, config, verify } = result;
      return (
        <>
          {path && <ConnPath />}
          {config !== null && <ConnConfig config={config} />}
          {verify !== null && <ConnVerify verify={verify} />}
          <p>Then connect again.</p>
        </>
      );
    }
  }
}
