import type { ReactElement } from "react";
import type { GitContentEntry } from "@/git/content";

export function BlogList(props: {
  linkBase: string;
  entries: GitContentEntry[];
}): ReactElement {
  const { linkBase, entries } = props;

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.path}>
          <a href={`${linkBase}/${entry.path}`}>
            {entry.type === "dir" ? `${entry.name}/` : entry.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
