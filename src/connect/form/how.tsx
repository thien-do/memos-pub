import type { ReactElement } from "react";
import { ConnectCheckResult as Result } from "../check";
import { ConnectFormSetup } from "./setup";

export function ConnectFormHow(props: { result: Result }): ReactElement {
  const { result } = props;

  switch (result.step) {
    case "input": {
      switch (result.reason) {
        case "hostname-parse":
          return <p>Enter a domain, like “example.com”</p>;
        case "hostname-unsafe":
          return <p>We can't support that domain, sorry.</p>;
        case "path-parse":
          return <p>Enter a repo path, like “thien-do/blog”.</p>;
        case "path-unsafe":
          return <p>We can't support that path, sorry.</p>;
      }
    }
    case "record": {
      switch (result.reason) {
        case "apex-limit":
          return <p>This domain already has three names here.</p>;
      }
    }
    case "setup": {
      return (
        <>
          <p>Update your DNS, then connect again.</p>
          <ConnectFormSetup reason={result.reason} />
        </>
      );
    }
    case "success": {
      return (
        <p>
          “{result.hostname}” is connected to “{result.path}”.
        </p>
      );
    }
  }
}
