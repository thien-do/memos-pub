import { URLComponents } from "../url/component";
import { fetchGitHubSource, isGitHubSource } from "./github";

export const fetchSource = async (
  components: URLComponents
): Promise<string> => {
  switch (true) {
    case isGitHubSource(components):
      return fetchGitHubSource(components);
  }
  throw Error(`Unknown source: "${components}"`);
};
