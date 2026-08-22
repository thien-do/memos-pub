"use server";

import { checkDomainTxt } from "@/domain/check";

export async function checkDomainAction(
  _prev: string | null | undefined,
  formData: FormData,
): Promise<string | null> {
  const host = formData.get("host");
  if (typeof host !== "string") return null;
  const target = await checkDomainTxt(host);
  return target;
}
