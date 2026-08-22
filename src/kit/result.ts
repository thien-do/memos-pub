export type Result<Value> =
  { ok: true; value: Value } | { ok: false; reason: string };

export function toResult<Value>(
  value: Value | null | undefined,
  reason: string,
): Result<Value> {
  const empty = value === null || value === undefined;
  return empty ? { ok: false, reason } : { ok: true, value };
}
