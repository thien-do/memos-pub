import { GitHubFile } from "@/lib/github/type";
import { compileMdx } from "@/lib/mdx/compile/compile";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import nodepath from "path";
import { BlogRequest } from "../request/type";
import { BlogPost } from "./type";

interface Props {
	file: GitHubFile;
	request: BlogRequest;
}

const makeResolvers = (props: Props): MdxUrlResolvers => ({
	asset: (url) => {
		const { owner, repo, path } = props.request;
		const dirname = nodepath.dirname(path);
		const assetPath = nodepath.join(dirname, url);
		const origin = "https://raw.githubusercontent.com";
		return `${origin}/${owner}/${repo}/HEAD/${assetPath}`;
	},
	link: (url) => {
		const { repo, domain } = props.request;
		if (domain !== null) return url;
		// Manually prefix repo part to match GitHub behaviour
		const nextUrl = `/${nodepath.join(repo, url)}`;
		return nextUrl;
	},
});

export const parseBlogPost = async (props: Props): Promise<BlogPost> => {
	const { file } = props;

	if (!("content" in file)) throw Error("File doesn't have content");
	const content = Buffer.from(file.content, "base64").toString();

	const urlResolvers = makeResolvers(props);
	const code = await compileMdx({ content, urlResolvers });

	return { type: "post", code };
};
