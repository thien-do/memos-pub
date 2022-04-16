import { BlogPost } from "@/lib/blog/post/type";
import { compileMdx } from "@/lib/mdx/compile";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { GitHubRequest } from "../../type";
import { GitHubFile } from "../type";

interface Props<R extends GitHubRequest> {
	file: GitHubFile;
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogPost = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogPost> => {
	const { file, request } = props;

	if (!("content" in file)) throw Error("File doesn't have content");

	const content = Buffer.from(file.content, "base64").toString();

	const resolvers = props.resolvers;
	const code = await compileMdx<R>({
		content: content,
		options: { request, resolvers },
	});

	return { type: "post", code };
};
