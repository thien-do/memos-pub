import { RequestError } from "octokit";

/** Wrap a strict getter: GitHub 404 becomes null, all else throws. */
export function mapGitNotFoundToNull<Params, Result>(
  get: (params: Params) => Promise<Result>,
): (params: Params) => Promise<Result | null> {
  return async (params) => {
    try {
      return await get(params);
    } catch (error) {
      if (error instanceof RequestError && error.status === 404) return null;
      throw error;
    }
  };
}
