import { Vercel } from "@vercel/sdk";
import { getEnvVar } from "@/kit/env";

export function getVercel(): Vercel {
  const bearerToken = getEnvVar("MEMOS_VERCEL_TOKEN");
  const vercel = new Vercel({ bearerToken });
  return vercel;
}
