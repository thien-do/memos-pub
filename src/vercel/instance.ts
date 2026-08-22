import { Vercel } from "@vercel/sdk";

export function getVercel(): Vercel {
  const token = process.env.VERCEL_TOKEN;
  const noToken = token === undefined || token === "";
  if (noToken) throw new Error("VERCEL_TOKEN is not set");
  return new Vercel({ bearerToken: token });
}
