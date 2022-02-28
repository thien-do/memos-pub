import { URLComponents } from "../url/component";

export const isGitHubSource = (components: URLComponents): boolean => {
  return components[0] === "github.com";
};

const makeUrl = (components: URLComponents): string => {
  const [_host, user, repo, _blob, branch, ...path] = components;
  const url = [
    "https://raw.githubusercontent.com",
    `${user}/${repo}/${branch}`,
    ...path,
  ].join("/");
  return url;
};

export const fetchGitHubMarkdown = async (
  components: URLComponents
): Promise<string> => {
  if (isGitHubSource(components) === false) {
    throw Error(`Expect host to be "github.com", received "${host}" instead`);
  }

  const url = makeUrl(components);
  const response = await fetch(url);
  const markdown = await response.text();
  return markdown;
};
