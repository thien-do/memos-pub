"use server";

import { checkDomain, verifyDomain, type DomainCheck } from "@/domain/check";

export async function checkDomainAction(
  _prev: DomainCheck | null | undefined,
  formData: FormData,
): Promise<DomainCheck | null> {
  const raw = formData.get("host");
  if (typeof raw !== "string") return null;
  const intent = formData.get("intent");
  if (intent === "verify") return verifyDomain(raw);
  return checkDomain(raw);
}
