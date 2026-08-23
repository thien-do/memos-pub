import type { ReactElement } from "react";
import type { GitContentEntry } from "@/git/content";
import { BlogFile } from "./file";

export function BlogDir(props: {
  linkBase: string;
  entries: GitContentEntry[];
  readme: string | null;
}): ReactElement {
  const { linkBase, entries, readme } = props;

  return (
    <div>
      {readme !== null ? <BlogFile text={readme} /> : null}
      <ul>
        {entries.map((entry) => (
          <li key={entry.path}>
            <a href={`${linkBase}/${entry.path}`}>
              {entry.type === "dir" ? `${entry.name}/` : entry.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
