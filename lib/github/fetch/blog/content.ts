import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { GitHubRequest } from "../../type";
import { parseGitHubBlogList } from "./list";
import { parseGitHubBlogError } from "./error";
import { parseGitHubBlogPost } from "./post";
import { BlogContent } from "@/lib/blog/content/type";
import { fetchGitHubContent } from "../content";
import { components } from "@octokit/openapi-types";

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
			return await parseGitHubBlogList({ request, response, resolvers });
		}

		// Single file raw
		if (typeof response === "string") {
			throw Error("Not support raw response");
		}

		// Single file json
		if (response.type === "file") {
			const r = response as components["schemas"]["content-file"];
			return parseGitHubBlogPost({ request, response: r, resolvers });
		}

		throw Error(`Unknown content type "${response.type}"`);
	} catch (error) {
		return parseGitHubBlogError(props.request, error);
	}
};
