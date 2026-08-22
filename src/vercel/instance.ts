import { Vercel } from "@vercel/sdk";
import { getEnvVar } from "@/kit/env";

/** We always need project along */
interface Return {
  vercel: Vercel
  project: string;
}

export function getVercel(): Return {
  const bearerToken = getEnvVar("MEMOS_VERCEL_TOKEN");
  const vercel = new Vercel({ bearerToken });
  const project = getEnvVar("MEMOS_VERCEL_PROJECT_ID");
  return { vercel, project};
}
