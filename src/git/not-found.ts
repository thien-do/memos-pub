import { z } from "zod";

// GitHub's not-found error shape
const NotFound = z.object({ status: z.literal(404) });

type Get<Params, Result> = (params: Params) => Promise<Result>;

type Wrap<Params, Result> = (params: Params) => Promise<Result | null>;

type Map = <Params, Result>(get: Get<Params, Result>) => Wrap<Params, Result>;

/** Wrap a strict getter: GitHub 404 becomes null, all else throws. */
export const mapGitNotFoundToNull: Map = (get) => {
  return async (params) => {
    try {
      return await get(params);
    } catch (error) {
      if (NotFound.safeParse(error).success) return null;
      throw error;
    }
  };
};
