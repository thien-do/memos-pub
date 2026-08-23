import type { ReactElement } from "react";
import type { GitContentEntry } from "@/git/content";
import { BlogFile } from "./file";

export function BlogDir(props: {
  linkBase: string;
  entries: GitContentEntry[];
  readme: string | null;
}): ReactElement {
  const { linkBase, entries, readme } = props;
  const listed =
    readme === null
      ? entries
      : entries.filter((entry) => entry.name !== "README.md");

  return (
    <div>
      {readme !== null ? <BlogFile text={readme} /> : null}
      <ul>
        {listed.map((entry) => (
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
