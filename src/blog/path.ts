export function getIsBlogPathAllowed(path: string): boolean {
  const name = path.split("/").filter(Boolean).at(-1) ?? "";

  return !name.includes(".") || name.toLowerCase().endsWith(".md");
}
