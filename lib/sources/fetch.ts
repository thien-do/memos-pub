import { markdownToHTML } from "../markdown/html";
import { URLSegments } from "../url/segment";
import { fetchGitHubMarkdown, isGitHubSource } from "./github";

const fetchMarkdown = async (segments: URLSegments): Promise<string> => {
  switch (true) {
    case isGitHubSource(segments):
      return fetchGitHubMarkdown(segments);
  }
  throw Error(`Unknown source: "${segments}"`);
};

export const fetchSource = async (segments: URLSegments): Promise<string> => {
  const markdown = await fetchMarkdown(segments);
  const html = await markdownToHTML(markdown);
  return html;
};
