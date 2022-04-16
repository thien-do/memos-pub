import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import nodepath from "path";
import { GitHubRequest } from "./type";

type Resolvers = MdxUrlResolvers<GitHubRequest>;

const asset: Resolvers["asset"] = (props) => {
	const { url, request } = props;
	const { owner, repo, path: mdPath } = request;
	const dirname = nodepath.dirname(mdPath);
	const assetPath = nodepath.join(dirname, url);
	const origin = "https://raw.githubusercontent.com";
	return `${origin}/${owner}/${repo}/HEAD/${assetPath}`;
};

const link: Resolvers["link"] = (props) => {
	const { url, request } = props;
	const { repo } = request;
	const nextUrl = `/${nodepath.join(repo, url)}`;
	return nextUrl;
};

export const gitHubMdxResolvers: Resolvers = { asset, link };
