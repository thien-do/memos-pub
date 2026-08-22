/** Hostname from a Host header. */
export function getDomainHost(header: string): string {
  return header.split(":").at(0)?.toLowerCase() ?? "";
}
