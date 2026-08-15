import type { ReactElement } from "react";
import type { GitContentEntry } from "@/git/content";

export function BlogListing(props: {
  repo: string;
  entries: GitContentEntry[];
}): ReactElement {
  const { repo, entries } = props;

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.path}>
          <a href={`/${repo}/${entry.path}`}>
            {entry.type === "dir" ? `${entry.name}/` : entry.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
