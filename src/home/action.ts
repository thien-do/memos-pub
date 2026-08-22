"use server";

import { checkDomain, type DomainCheck } from "./check";

export async function checkDomainAction(
  _prev: DomainCheck | undefined,
  formData: FormData,
): Promise<DomainCheck> {
  const raw = formData.get("domain");
  if (typeof raw !== "string")  throw Error("invalid domain input")
  return checkDomain(raw);
}
