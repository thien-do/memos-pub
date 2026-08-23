import { Verification } from "@vercel/sdk/models/getprojectdomainop";

export type VercelDetailReason = Verification[];

/**
 * Better type than Vercel's built-in
 */
export type VercelDetailVerify =
  | { ok: true }
  | { ok: false; reason: VercelDetailReason };

/**
 * Detail of a domain as attached to our project.
 */
export interface VercelDetail {
  apex: string;
  verify: VercelDetailVerify;
}

/**
 * Vercel's domain-project body type.
 * This covers many related operations,
 * so it's simpler to define here rather than intersect them.
 */
interface Raw {
  apexName: string;
  verified: boolean;
  verification?: Verification[];
}

export function getVercelDetail(raw: Raw): VercelDetail {
  const { apexName: apex, verified, verification } = raw;

  if (verified === true) return { apex, verify: { ok: true } };

  if (verification === undefined)
    throw Error("Domain not verified with no verification");

  return { apex, verify: { ok: false, reason: verification } };
}
