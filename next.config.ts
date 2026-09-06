import type { NextConfig } from "next";

const config: NextConfig = {
  // This is super important.
  // We rely on the original behaviour for relative links.
  // Directories must always end in a trailing slash, files must never.
  skipTrailingSlashRedirect: true,
};

export default config;
