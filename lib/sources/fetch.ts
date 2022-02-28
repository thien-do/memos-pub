import { markdownToHTML } from "../markdown/html";
import { URLComponents } from "../url/component";
import { fetchGitHubMarkdown, isGitHubSource } from "./github";

const fetchMarkdown = async (components: URLComponents): Promise<string> => {
  switch (true) {
    case isGitHubSource(components):
      return fetchGitHubMarkdown(components);
  }
  throw Error(`Unknown source: "${components}"`);
};

export const fetchSource = async (
  components: URLComponents
): Promise<string> => {
  const markdown = await fetchMarkdown(components);
  const html = await markdownToHTML(markdown);
  return html;
};
