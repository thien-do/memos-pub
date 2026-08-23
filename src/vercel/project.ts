import { Verification } from "@vercel/sdk/models/getprojectdomainop";
import { getVercelVerify, VercelVerify } from "./verify";

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
  return {
    apex: body.apexName,
    verify: getVercelVerify(body),
  };
}
