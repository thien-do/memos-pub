import { VercelError } from "@vercel/sdk/models/vercelerror.js";
import { getEnvVar } from "@/kit/env";
import { getVercel } from "./instance";

interface Verification {
  type: string;
  domain: string;
  value: string;
}

interface Body {
  verified: boolean;
  verification?: Verification[];
}

export type VercelProjectDomain =
  | { verified: true; txt: null }
  | { verified: false; txt: { domain: string; value: string } };

function fromBody(body: Body): VercelProjectDomain {
  const row = body.verification?.find((item) => item.type === "TXT");
  if (body.verified) return { verified: true, txt: null };
  if (row === undefined) {
    throw new Error("Unverified domain has no TXT challenge");
  }
  return {
    verified: false,
    txt: { domain: row.domain, value: row.value },
  };
}

export async function getVercelProjectDomain(params: {
  name: string;
}): Promise<VercelProjectDomain | null> {
  const { name } = params;
  const idOrName = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  const vercel = getVercel();
  try {
    const body = await vercel.projects.getProjectDomain({
      idOrName,
      domain: name,
    });
    return fromBody(body);
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (!missed) throw error;
    return null;
  }
}

export async function addVercelProjectDomain(params: {
  name: string;
}): Promise<VercelProjectDomain> {
  const { name } = params;
  const idOrName = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  const vercel = getVercel();
  const body = await vercel.projects.addProjectDomain({
    idOrName,
    requestBody: { name },
  });
  return fromBody(body);
}
