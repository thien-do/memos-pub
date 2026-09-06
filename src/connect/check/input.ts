import { getIsHostCustomPathSafe } from "@/host/custom";
import { getIsHostPlatform } from "@/host/platform";

type FieldReason = "parse" | "unsafe";

type FieldResult =
  | { ok: true; value: string }
  | { ok: false; reason: FieldReason };

function parseHostname(data: FormData): FieldResult {
  let input = data.get("hostname");
  if (typeof input !== "string") throw Error("invalid hostname form data");

  input = input.trim().toLowerCase();
  // URL class requires scheme
  input = input.includes("://") ? input : `https://${input}`;
  input = URL.parse(input)?.hostname ?? null;

  if (input === null) return { ok: false, reason: "parse" };
  if (getIsHostPlatform(input)) return { ok: false, reason: "unsafe" };

  return { ok: true, value: input };
}

function parsePath(data: FormData): FieldResult {
  let input = data.get("path");
  if (typeof input !== "string") throw Error("invalid path form data");

  input = input.trim();

  const unsafe = getIsHostCustomPathSafe(input) === false;
  if (unsafe) return { ok: false, reason: "unsafe" };

  return { ok: true, value: input };
}

export type ConnectCheckInputReason = `${"hostname" | "path"}-${FieldReason}`;

export interface ConnectCheckInput {
  hostname: string;
  path: string;
}

type Result =
  | ({ ok: true } & ConnectCheckInput)
  | { ok: false; reason: ConnectCheckInputReason };

export function parseConnectCheckInput(data: FormData): Result {
  const hostname = parseHostname(data);
  if (!hostname.ok) return { ok: false, reason: `hostname-${hostname.reason}` };

  const path = parsePath(data);
  if (!path.ok) return { ok: false, reason: `path-${path.reason}` };

  return { ok: true, hostname: hostname.value, path: path.value };
}
