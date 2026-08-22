import { hasPlatform } from "@/domain/platform";

export function cleanHomeDomain(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;

  const domain = URL.parse(withScheme)?.hostname ?? null
  if (domain === null) return null;
  if (hasPlatform(domain)) return null;
  return domain;
}
