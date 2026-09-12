import type { NextConfig } from "next";

const config: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  cacheLife: {
    github: { stale: 300, revalidate: 240, expire: 300 },
  },
  // This is super important.
  // We rely on the original behaviour for relative links.
  // Directories must always end in a trailing slash, files must never.
  skipTrailingSlashRedirect: true,
};

export default config;
