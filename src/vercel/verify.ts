import { Verification } from "@vercel/sdk/models/getprojectdomainop";

export type VercelVerifyReason = Verification[]

export type VercelVerify =
  | { ok: true }
  | { ok: false; reason: VercelVerifyReason };

/** Common body of Vercel domain operations */
interface VercelBody {
  verified: boolean;
  verification?: Verification[];
}

export function getVercelVerify(body: VercelBody): VercelVerify {
  const { verified, verification } = body;

  if (verified === true) return { ok: true };

  if (verification === undefined)
    throw Error("Domain not verified with no verification");

  return { ok: false, reason: verification };
}
