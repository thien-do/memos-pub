import type { ReactElement } from "react";
import type { ConnCheckResult } from "./check";

export function ConnInstruction(props: {
  result: ConnCheckResult;
}): ReactElement {
  const { result } = props;

  switch (result.type) {
    case "success": {
      return <p>This domain is connected to {result.path}.</p>;
    }
    case "clean": {
      switch (result.reason) {
        case "parse":
          return <p>Enter a domain like example.com.</p>;
        case "unsafe":
          return <p>That domain is not supported.</p>;
      }
    }
    case "custom": {
      return (
        <p>
          Add a TXT record at <code>_memos</code>. Set it to your GitHub path,
          for example <code>thien-do</code> or <code>thien-do/blog/notes</code>.
          Then connect again.
        </p>
      );
    }
    case "get": {
      switch (result.reason) {
        case "apex-limit":
          return <p>This domain already has three names here.</p>;
      }
    }
    case "setup": {
      const { config, verify } = result;
      return (
        <>
          {config !== null && (
            <>
              <p>Point this domain at us, then connect again.</p>
              <p>
                {config.kind === "cname" ? "CNAME" : "A"} {config.name}{" "}
                {config.value}
              </p>
            </>
          )}
          {verify !== null && (
            <>
              <p>Prove you own this domain, then connect again.</p>
              {verify.map((item) => (
                <p key={item.value}>
                  {item.type} {item.domain} {item.value}
                </p>
              ))}
            </>
          )}
        </>
      );
    }
  }
}
