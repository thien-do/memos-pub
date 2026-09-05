import { getBlogView } from "./view";

function getH1(text: string): string | null {
  const title = /^#\s+(.+)$/m.exec(text)?.at(1)?.trim();
  return title === undefined || title === "" ? null : title;
}

function getPathName(params: { owner: string; path: string[] }): string {
  const last = params.path.at(-1) ?? params.owner;
  return last.endsWith(".md") ? last.slice(0, -".md".length) : last;
}

export async function getBlogTitle(params: {
  owner: string;
  path: string[];
}): Promise<string> {
  const { owner, path } = params;
  const name = getPathName({ owner, path });
  const view = await getBlogView({ owner, path });
  if (view?.kind === "file") return getH1(view.text) ?? name;
  if (view?.kind === "dir" && view.readme !== null) {
    return getH1(view.readme) ?? name;
  }
  return name;
}
