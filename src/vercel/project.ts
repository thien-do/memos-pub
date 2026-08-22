import { VercelError } from "@vercel/sdk/models/vercelerror.js";
import { getEnvVar } from "@/kit/env";
import { getVercel } from "./instance";

export type VercelProjectDomain = {
  verified: boolean;
  txtDomain: string | null;
  txtValue: string | null;
};

type ProjectDomainBody = {
  verified: boolean;
  verification?: Array<{ type: string; domain: string; value: string }>;
};

function fromBody(body: ProjectDomainBody): VercelProjectDomain {
  const rows = body.verification ?? [];
  const txt = rows.find((row) => row.type === "TXT");
  return {
    verified: body.verified,
    txtDomain: txt?.domain ?? null,
    txtValue: txt?.value ?? null,
  };
}

export async function addVercelProjectDomain(params: {
  name: string;
}): Promise<VercelProjectDomain> {
  const { name } = params;
  const idOrName = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  const vercel = getVercel();

  try {
    const existing = await vercel.projects.getProjectDomain({
      idOrName,
      domain: name,
    });
    return fromBody(existing);
  } catch (error) {
    const missed = error instanceof VercelError && error.statusCode === 404;
    if (!missed) throw error;
  }

  const added = await vercel.projects.addProjectDomain({
    idOrName,
    requestBody: { name },
  });
  return fromBody(added);
}
