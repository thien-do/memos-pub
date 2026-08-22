import { Verification } from "@vercel/sdk/models/getprojectdomainop";

export type VercelVerifyChallenge = Verification

export type VercelVerify =
  | { ok: true }
  | { ok: false; challenges: Verification[] };

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

  return { ok: false, challenges: verification };
}
