"use server";

import {
  connectHomeDomain,
  ConnectHomeDomainResult
} from "./connect";

export async function connectDomainAction(
  _prev: ConnectHomeDomainResult | undefined,
  formData: FormData,
): Promise<ConnectHomeDomainResult> {
  const raw = formData.get("domain");
  if (typeof raw !== "string")  throw Error("invalid domain input")
  return connectHomeDomain(raw);
}
