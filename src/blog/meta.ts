import type { Metadata } from "next";
import { getMarkTitle } from "@/mark/title";
import { getBlogView, type BlogView } from "./view";

function dropFileExt(name: string): string {
  const dot = name.lastIndexOf(".");
  if (dot <= 0) return name;
  return name.slice(0, dot);
}

function getViewText(view: BlogView): string | null {
  switch (view.kind) {
    case "file":
      return view.text;
    case "dir":
      return view.readme;
    case "owner":
      return null;
  }
}

function getNameTitle(params: {
  kind: BlogView["kind"];
  owner: string;
  path: string[];
}): string {
  const last = params.path.at(-1);
  if (last === undefined) return params.owner;
  if (params.kind === "file") return dropFileExt(last);
  return last;
}

export async function getBlogMeta(params: {
  owner: string;
  path: string[];
}): Promise<Metadata> {
  const { owner, path } = params;
  const icon = `https://github.com/${encodeURIComponent(owner)}.png`;
  const view = await getBlogView({ owner, path });

  if (view === null) return { icons: { icon }, title: owner };

  const name = getNameTitle({ kind: view.kind, owner, path });
  const text = getViewText(view);
  const title = (text === null ? null : getMarkTitle(text)) ?? name;

  return { icons: { icon }, title };
}
