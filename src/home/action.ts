"use server";

import { checkDomain, type DomainCheck } from "./check";

export async function checkDomainAction(
  _prev: DomainCheck | undefined,
  formData: FormData,
): Promise<DomainCheck> {
  const raw = formData.get("host");
  if (typeof raw !== "string") {
    return { type: "error", reason: "Can't use this domain." };
  }
  return checkDomain(raw);
}
