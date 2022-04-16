import { BlogContent } from "@/lib/blog/content/type";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components } from "@octokit/openapi-types";
import { GitHubRequest } from "../../type";
import { fetchGitHubContent } from "../content";
import { parseGitHubBlogError } from "./error";
import { parseGitHubBlogList } from "./list/list";
import { parseGitHubBlogPost } from "./post";

interface Props<R extends GitHubRequest> {
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const fetchGitHubBlogContent = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogContent> => {
	const { request, resolvers } = props;
	try {
		const response = await fetchGitHubContent(request);

		// Directory
		if (Array.isArray(response)) {
			const dir = response;
			return await parseGitHubBlogList({ request, dir, resolvers });
		}

		// Single file raw
		if (typeof response === "string") {
			throw Error("Not support raw response");
		}

		// Single file json
		if (response.type === "file") {
			const file = response as components["schemas"]["content-file"];
			return parseGitHubBlogPost({ request, file, resolvers });
		}

		throw Error(`Unknown content type "${response.type}"`);
	} catch (error) {
		return parseGitHubBlogError({ request, error });
	}
};
