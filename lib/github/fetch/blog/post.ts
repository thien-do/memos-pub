import { BlogPost } from "@/lib/blog/post/type";
import { compileMdx } from "@/lib/mdx/compile";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { GitHubRequest } from "../../type";
import { GitHubFile } from "../type";

interface Props<R extends GitHubRequest> {
	response: GitHubFile;
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogPost = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogPost> => {
	const { response, request } = props;

	if (!("content" in response)) throw Error("File doesn't have content");

	const content = Buffer.from(response.content, "base64").toString();

	const resolvers = props.resolvers;
	const code = await compileMdx<R>({
		content: content,
		options: { request, resolvers },
	});

	return { type: "post", code };
};
