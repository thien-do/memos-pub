"use server";

import { getDomainCustom } from "@/domain/custom";
import { parseDomainHost } from "@/domain/host";
import { addVercelDomain } from "@/vercel/domain";

export async function checkDomainAction(
  _prev: string | null | undefined,
  formData: FormData,
): Promise<string | null> {
  const raw = formData.get("host");
  if (typeof raw !== "string") return null;
  const host = parseDomainHost(raw);
  if (host === null) return null;
  const target = await getDomainCustom(host);
  if (target === null) return null;
  await addVercelDomain({ name: host });
  return target;
}
