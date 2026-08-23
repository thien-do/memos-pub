import { getVercel } from "./instance";

interface Reason {
  kind: "cname" | "ipv4";
  value: string;
}

export type VercelConfigReason = Reason;

type Result = { ok: true } | { ok: false; reason: Reason };

export async function getVercelDomainConfig(params: {
  apex: string;
  domain: string;
}): Promise<Result> {
  const { apex, domain } = params;
  const { project, vercel } = getVercel();

  const config = await vercel.domains.getDomainConfig({
    domain,
    projectIdOrName: project,
  });

  if (config.misconfigured === false) return { ok: true };

  const kind = domain === apex ? "ipv4" : "cname";
  const value =
    kind === "ipv4"
      ? (config.recommendedIPv4.at(0)?.value.at(0) ?? null)
      : (config.recommendedCNAME.at(0)?.value ?? null);
  if (value === null) throw Error("Domain misconfigured with no record");
  return { ok: false, reason: { kind, value } };
}
