export type Result<T> = { ok: true; value: T } | { ok: false; reason: string };
