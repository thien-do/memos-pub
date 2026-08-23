import { Verification } from "@vercel/sdk/models/getprojectdomainop";

export type VercelVerifyReason = Verification[];

export type VercelVerify =
  | { ok: true }
  | { ok: false; reason: VercelVerifyReason };

export interface VercelProject {
  apex: string;
  verify: VercelVerify;
}

interface Body {
  apexName: string;
  verified: boolean;
  verification?: Verification[];
}

export function getVercelProject(body: Body): VercelProject {
  const { apexName, verified, verification } = body;
  if (verified === true) return { apex: apexName, verify: { ok: true } };
  if (verification === undefined)
    throw Error("Domain not verified with no verification");
  return { apex: apexName, verify: { ok: false, reason: verification } };
}
