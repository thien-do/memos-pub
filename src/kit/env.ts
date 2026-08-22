/** Enforce a prefix to avoid silent fallback to system env */
type MemosEnv = `MEMOS_${string}`;

/** Strictly read an env var */
export function getEnvVar(name: MemosEnv): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(`${name} is not set`);
  }
  return value;
}
