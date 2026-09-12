export function getIsBlogPathAllowed(path: string): boolean {
  const name = path.split("/").filter(Boolean).at(-1) ?? "";

  return !name.includes(".") || getIsBlogPathMarkdown(name);
}

export function getIsBlogPathMarkdown(path: string): boolean {
  return path.toLowerCase().endsWith(".md");
}
