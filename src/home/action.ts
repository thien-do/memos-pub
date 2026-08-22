"use server";

import { checkDomain, type DomainCheck } from "@/domain/check";

export async function checkDomainAction(
  _prev: DomainCheck | null | undefined,
  formData: FormData,
): Promise<DomainCheck | null> {
  const raw = formData.get("host");
  if (typeof raw !== "string") return null;
  return checkDomain(raw);
}
