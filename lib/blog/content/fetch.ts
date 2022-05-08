import { BlogContent } from "@/lib/blog/content/type";
import { fetchGitHubContent } from "@/lib/github/content";
import { components } from "@octokit/openapi-types";
import { fetchBlogConfig } from "../config/fetch";
import { parseBlogList } from "../list/parse";
import { parseBlogPost } from "../post/parse";
import { fetchBlogReadme } from "../readme/fetch";
import { BlogRequest } from "../request/type";

export const fetchBlogContent = async (
	request: BlogRequest
): Promise<BlogContent> => {
	const [content, config, readme] = await Promise.all([
		fetchGitHubContent(request),
		fetchBlogConfig(request),
		fetchBlogReadme(request),
	]);

	// Directory
	if (Array.isArray(content)) {
		const dir = content;
		return parseBlogList({ dir, config, readme });
	}

	// Single file raw
	if (typeof content === "string") {
		throw Error("Not support raw response");
	}

	// Single file json
	if (content.type === "file") {
		const file = content as components["schemas"]["content-file"];
		return await parseBlogPost({ request, file });
	}

	throw Error(`Unknown content type "${content.type}"`);
};
