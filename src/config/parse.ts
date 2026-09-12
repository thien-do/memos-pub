import type { ConfigSource } from "./load";
import type { Config } from "./schema";
import { ConfigSchema } from "./schema";

export function parseConfig(source?: ConfigSource): Config {
  if (source?.status === "rejected") throw source.reason;

  const content = source?.value;
  if (content === undefined || content === null) {
    return ConfigSchema.parse(undefined);
  }
  if (content.kind !== "file") throw new Error("memos.json must be a file");

  return ConfigSchema.parse(JSON.parse(content.text));
}
