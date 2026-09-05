import { getHostCustomPath } from "./custom";
import { getHostPlatformOwner, getIsHostPlatform } from "./platform";

/**
 * Get a potential log path from a hostname,
 * covering both custom and platform.
 */
export async function getHostBlog(hostname: string): Promise<string | null> {
  const isPlatform = getIsHostPlatform(hostname);
  return isPlatform
    ? getHostPlatformOwner(hostname)
    : await getHostCustomPath(hostname);
}
