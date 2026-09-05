import type { VercelConfigReason } from "@/vercel/config";
import type { VercelDetailReason } from "@/vercel/detail";
import type { ConnectCheckResultRecord } from "./result";

export function connectCheckRecords(props: {
  domain: string;
  path: string | null;
  inputPath: string;
  config: VercelConfigReason | null;
  verify: VercelDetailReason | null;
}): ConnectCheckResultRecord[] {
  const { domain, path, inputPath, config, verify } = props;
  const records: ConnectCheckResultRecord[] = [];

  if (path === null) {
    records.push({
      type: "TXT",
      name: `_memos.${domain}`,
      value: inputPath.trim() || null,
    });
  }

  if (config !== null) {
    records.push({
      type: config.kind === "cname" ? "CNAME" : "A",
      name: config.name,
      value: config.value,
    });
  }

  for (const item of verify ?? []) {
    records.push({ type: item.type, name: item.domain, value: item.value });
  }

  return records;
}
