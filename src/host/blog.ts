import { NextRequest } from "next/server";
import { getHostCustomPath } from "./custom";
import { getHostPlatformOwner, getIsHostPlatform } from "./platform";

/**
 * Get a potential blog path from a request,
 * covering both custom and platform.
 */
export async function getHostBlog(
  request: NextRequest,
): Promise<string | null> {
  // nextUrl.hostname is not reliable, as Vercel overrides it after handled.
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":").at(0)?.toLowerCase() ?? "";

  const isPlatform = getIsHostPlatform(hostname);
  return isPlatform
    ? getHostPlatformOwner(hostname)
    : await getHostCustomPath(hostname);
}
