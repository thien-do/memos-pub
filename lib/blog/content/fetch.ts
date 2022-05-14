import { BlogContent } from "@/lib/blog/content/type";
import { fetchGitHubContent } from "@/lib/github/content";
import { components } from "@octokit/openapi-types";
import { fetchBlogConfig } from "../config/fetch";
import { BlogConfig } from "../config/type";
import { parseBlogList } from "../list/parse";
import { parseBlogPost } from "../post/parse";
import { fetchBlogReadme } from "../readme/fetch";
import { BlogRequest } from "../request/type";

interface Result {
	content: BlogContent;
	config: BlogConfig | null;
}

export const fetchBlogContent = async (request: BlogRequest): Promise<Result> => {
	const [raw, config, readme] = await Promise.all([
		fetchGitHubContent(request),
		fetchBlogConfig(request),
		fetchBlogReadme(request),
	]);

	// Directory
	if (Array.isArray(raw)) {
		const dir = raw;
		const content = parseBlogList({ dir, config, readme });
		return { content, config };
	}

	// Single file raw
	if (typeof raw === "string") {
		throw Error("Not support raw response");
	}

	// Single file json
	if (raw.type === "file") {
		const file = raw as components["schemas"]["content-file"];
		const content = await parseBlogPost({ request, file });
		return { content, config };
	}

	throw Error(`Unknown content type "${raw.type}"`);
};
