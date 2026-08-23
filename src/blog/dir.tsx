import type { ReactElement } from "react";
import { BlogFile } from "./file";
import type { BlogViewDir } from "./view";

export function BlogDir(props: { view: BlogViewDir }): ReactElement {
  const { view } = props;
  const { linkBase, entries, readme } = view;

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
