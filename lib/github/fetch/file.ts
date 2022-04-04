import { BlogFile } from "@/lib/blog/type";
import { compileMdx } from "@/lib/mdx/compile";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components } from "@octokit/openapi-types";
import { gitHubMdxResolvers } from "../mdx/url";
import { GitHubBlogRequest } from "../type";

type RawFile = components["schemas"]["content-file"];

interface Props {
	response: RawFile;
	request: GitHubBlogRequest;
	resolvers?: MdxUrlResolvers<GitHubBlogRequest>;
}

export const parseBlogGitHubFile = async (props: Props): Promise<BlogFile> => {
	const { response, request } = props;

	if (!("content" in response)) throw Error("File doesn't have content");

	const content = Buffer.from(response.content, "base64").toString();

	const resolvers = props.resolvers ?? gitHubMdxResolvers;
	const code = await compileMdx<GitHubBlogRequest>({
		content: content,
		options: { request, resolvers },
	});

	return { type: "file", code };
};
