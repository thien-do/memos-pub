import { fetchGitHubContent } from "@/lib/github/content";
import { isErrorHasStatus } from "@/lib/github/error";
import { BlogPost } from "../post/type";
import { BlogRequest } from "../request/type";
import { join as pathJoin } from "path";
import { parseBlogPost } from "../post/parse";
import { components } from "@octokit/openapi-types";

export const fetchBlogReadme = async (
	originalRequest: BlogRequest
): Promise<BlogPost | null> => {
	try {
		const request = { ...originalRequest };
		if (request.path.endsWith(".md")) return null;
		request.path = pathJoin(request.path, "README.md");
		const raw = await fetchGitHubContent(request);

		// Exceptions
		if (Array.isArray(raw)) throw Error("README should not be a dir");
		if (typeof raw === "string") throw Error("Response should be in json");
		if (raw.type !== "file") throw Error(`Unknown type "${raw.type}"`);

		const file = raw as components["schemas"]["content-file"];
		const readme = parseBlogPost({ file, request });
		return readme;
	} catch (error) {
		if (!isErrorHasStatus(error)) throw error;
		if (error.status === 404) return null;
		throw error;
	}
};
