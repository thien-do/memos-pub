import type { ReactElement } from "react";
import { MarkFile } from "@/mark/file";
import { GitContentEntry } from "@/git/content";
import { BlogTreeDir } from "./tree";

function Row(props: { entry: GitContentEntry }): ReactElement {
  const { entry } = props;

  const name = entry.type === "dir" ? `${entry.name}/` : entry.name;

  return (
    <li>
      <a href={`./${name}`}>{name}</a>
    </li>
  );
}

export function BlogDir(props: { dir: BlogTreeDir }): ReactElement {
  const { dir } = props;
  const { readme, entries } = dir;

  return (
    <div>
      {readme !== null ? <MarkFile text={readme} /> : null}
      <ul>
        {entries.map((entry) => (
          <Row key={entry.name} entry={entry} />
        ))}
      </ul>
    </div>
  );
}
