type MemosEnv = `MEMOS_${string}`;

/** Read a required MEMOS_ env var. Empty string is missing. */
export function getEnvVar(name: MemosEnv): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(`${name} is not set`);
  }
  return value;
}
