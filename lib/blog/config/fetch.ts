import { fetchGitHubContent } from "@/lib/github/content";
import { isErrorHasStatus } from "@/lib/github/error";
import { BlogRequest } from "../request/type";
import { BlogConfig } from "./type";

export const fetchBlogConfig = async (
	originalRequest: BlogRequest
): Promise<BlogConfig | null> => {
	try {
		const request = { ...originalRequest };
		request.path = "memos-pub.thien.do.json";
		const raw = await fetchGitHubContent(request);

		// Exceptions
		if (Array.isArray(raw)) throw Error("Config should not be a dir");
		if (typeof raw === "string") throw Error("Response should be in json");
		if (raw.type !== "file") throw Error(`Unknown type "${raw.type}"`);

		if (!("content" in raw)) throw Error("File doesn't have content");
		const content = Buffer.from(raw.content, "base64").toString();
		const config = JSON.parse(content) as BlogConfig;
		return config;
	} catch (error) {
		if (!isErrorHasStatus(error)) throw error;
		if (error.status === 404) return null;
		throw error;
	}
};
