import { MdxResolveUrl } from "@/lib/mdx/compile/url";
import nodepath from "path";
import { BlogRequestWithRef } from "../type";

type Resolve = MdxResolveUrl<BlogRequestWithRef>;

/** Rewrite relative url to absolute */
export const resolveBlogMdxUrl: Resolve = (props): string => {
	const { url, request } = props;
	const { owner, repo, ref, path: mdPath } = request;
	const dirname = nodepath.dirname(mdPath);
	const assetPath = nodepath.join(dirname, url);
	const origin = "https://raw.githubusercontent.com";
	return `${origin}/${owner}/${repo}/${ref}/${assetPath}`;
};
