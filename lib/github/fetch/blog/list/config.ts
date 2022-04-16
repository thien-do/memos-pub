import { BlogListConfig } from "@/lib/blog/list/config";
import { join } from "path";
import { GitHubRequest } from "../../../type";
import { fetchGitHubContent } from "../../content";
import { parseGitHubBlogError } from "../error";

interface Props<R extends GitHubRequest> {
	request: R;
}

export const fetchGitHubBlogListConfig = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogListConfig | null> => {
	const request = { ...props.request };
	request.path = join(request.path, "memos.json");
	try {
		const raw = await fetchGitHubContent(request);

		// Directory
		if (Array.isArray(raw)) throw Error("Config cannot be dir");

		// Single file raw
		if (typeof raw === "string") throw Error("Not support raw response");

		// Single file json
		if (raw.type === "file") {
			if (!("content" in raw)) throw Error("File doesn't have content");
			const content = Buffer.from(raw.content, "base64").toString();
			const config = JSON.parse(content) as BlogListConfig;
			return config;
		}

		throw Error(`Unknown content type "${raw.type}"`);
	} catch (error) {
		const parsed = parseGitHubBlogError({ error, request });
		// BlogListConfig is optional
		if (parsed.status === 404) return null;
		throw parsed;
	}
};
