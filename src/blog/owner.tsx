import type { ReactElement } from "react";
import type { GitRepo } from "@/git/repos";

export function BlogOwner(props: { repos: GitRepo[] }): ReactElement {
  const { repos } = props;

  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.name}>
          <a href={`./${repo.name}/`}>{repo.name}</a>
        </li>
      ))}
    </ul>
  );
}
