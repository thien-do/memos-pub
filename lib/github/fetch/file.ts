import { BlogFile } from "@/lib/blog/file/type";
import { compileMdx } from "@/lib/mdx/compile";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components } from "@octokit/openapi-types";
import { GitHubBlogRequest } from "../type";

type RawFile = components["schemas"]["content-file"];

interface Props<R extends GitHubBlogRequest> {
	response: RawFile;
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogFile = async <R extends GitHubBlogRequest>(
	props: Props<R>
): Promise<BlogFile> => {
	const { response, request } = props;

	if (!("content" in response)) throw Error("File doesn't have content");

	const content = Buffer.from(response.content, "base64").toString();

	const resolvers = props.resolvers;
	const code = await compileMdx<R>({
		content: content,
		options: { request, resolvers },
	});

	return { type: "file", code };
};
