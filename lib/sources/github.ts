import { URLSegments } from "../url/segment";

export const isGitHubSource = (segments: URLSegments): boolean => {
  return segments[0] === "github.com";
};

const makeUrl = (segments: URLSegments): string => {
  const [_host, user, repo, _blob, branch, ...path] = segments;
  const url = [
    "https://raw.githubusercontent.com",
    `${user}/${repo}/${branch}`,
    ...path,
  ].join("/");
  return url;
};

export const fetchGitHubMarkdown = async (
  segments: URLSegments
): Promise<string> => {
  if (isGitHubSource(segments) === false) throw Error(`Not GitHub source`);

  const url = makeUrl(segments);
  const response = await fetch(url);
  const markdown = await response.text();
  return markdown;
};
