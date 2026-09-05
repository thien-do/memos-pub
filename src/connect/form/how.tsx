import type { ReactElement } from "react";
import type { ConnectCheckResult } from "../check/result";
import { InputField } from "@/kit/input-field";
import { ConnectFormRecords } from "./records";

export function ConnectFormHow(props: {
  result: ConnectCheckResult;
}): ReactElement {
  const { result } = props;

  switch (result.type) {
    case "success": {
      return (
        <>
          <p>This domain is connected.</p>
          <InputField label="GitHub path" value={result.path} readonly />
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
    case "ensure": {
      switch (result.reason) {
        case "apex-limit":
          return <p>This domain already has three names here.</p>;
      }
    }
    case "setup": {
      return (
        <>
          <ConnectFormRecords records={result.records} />
          <p>Then connect again.</p>
        </>
      );
    }
  }
}
