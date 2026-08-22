"use server";

import { checkDomain, type DomainCheck } from "@/domain/check";

export async function checkDomainAction(
  _prev: DomainCheck | undefined,
  formData: FormData,
): Promise<DomainCheck> {
  const raw = formData.get("host");
  if (typeof raw !== "string") {
    return { ok: false, reason: "Can't use this domain." };
  }
  return checkDomain(raw);
}
