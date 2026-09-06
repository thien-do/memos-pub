import type { VercelDetail } from "@/vercel/detail";
import { ConnectCheckInput } from "./input";
import { getVercelConfig, VercelConfigReason } from "@/vercel/config";
import { getHostCustomPath } from "@/host/custom";

interface Record {
  type: string;
  name: string;
  value: string;
}

export type { Record as ConnectCheckSetupRecord };

function getConfigType(reason: VercelConfigReason): string {
  switch (reason.kind) {
    case "cname":
      return "CNAME";
    case "ipv4":
      return "A";
  }
}

export type ConnectCheckSetupReason = Record[];

type Result =
  | { ok: false; reason: ConnectCheckSetupReason }
  | ({ ok: true } & ConnectCheckInput);

export async function getConnectCheckSetup(params: {
  input: ConnectCheckInput;
  record: VercelDetail;
}): Promise<Result> {
  // Naming VercelRecord as "vercel" to avoid confusion with our DNS record.
  const { input, record: vercel } = params;

  // Heads up: input.path is not the final value. See `path` below.
  const { hostname } = input;
  const { apex, verify } = vercel;

  const config = await getVercelConfig({ apex, domain: hostname });
  const path = await getHostCustomPath(hostname);

  if (path !== null && config.ok && vercel.verify.ok)
    return { ok: true, hostname, path };

  const records: Record[] = [];

  if (path === null) {
    records.push({
      type: "TXT",
      name: `_memos.${hostname}`,
      value: input.path,
    });
  }

  if (config.ok === false) {
    records.push({
      type: getConfigType(config.reason),
      name: config.reason.name,
      value: config.reason.value,
    });
  }

  if (verify.ok === false) {
    for (const item of verify.reason) {
      const { type, domain, value } = item;
      records.push({ type, name: domain, value });
    }
  }

  return { ok: false, reason: records };
}
