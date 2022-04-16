import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import nodepath from "path";
import { GitHubRequest } from "./type";

export const gitHubMdxResolvers: MdxUrlResolvers<GitHubRequest> = {
	asset: (props) => {
		const { url, request } = props;
		const { owner, repo, path: mdPath } = request;
		const dirname = nodepath.dirname(mdPath);
		const assetPath = nodepath.join(dirname, url);
		const origin = "https://raw.githubusercontent.com";
		return `${origin}/${owner}/${repo}/HEAD/${assetPath}`;
	},
	link: (props) => {
		const { url, request } = props;
		const { repo } = request;
		const nextUrl = `/${nodepath.join(repo, url)}`;
		return nextUrl;
	},
};
