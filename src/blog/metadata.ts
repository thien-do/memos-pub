import type { Metadata } from "next";

export function getBlogMetadata(params: { owner: string }): Metadata {
  const { owner } = params;

  const icon = `https://avatars.githubusercontent.com/${owner}`;

  return { icons: { icon } };
}
