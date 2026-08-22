import { Vercel } from "@vercel/sdk";
import { getEnvVar } from "@/kit/env";

export function getVercel(): Vercel {
  return new Vercel({ bearerToken: getEnvVar("MEMOS_VERCEL_TOKEN") });
}
