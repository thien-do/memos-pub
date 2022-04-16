import { BlogListConfig } from "@/lib/blog/list/config/type";
import { operations } from "@octokit/openapi-types";
import { GitHubRequest } from "../../type";
import { parseGitHubBlogError } from "../error";
import { getOctokit } from "../octokit";

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

interface Props<R extends GitHubRequest> {
	request: R;
}

export const fetchGitHubBlogListConfig = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogListConfig | null> => {
	const { owner, path, repo } = props.request;
	try {
		const get = getOctokit().rest.repos.getContent;
		const mediaType = { format: "json" };
		const raw = await get({ owner, path, repo, mediaType });
		const response = parseResponse(raw.data);
		return response;
	} catch (raw) {
		const error = parseGitHubBlogError(props.request, raw);
		// BlogListConfig is optional
		if (error.status === 404) return null;
		throw error;
	}
};

const parseResponse = (raw: RawResponse): BlogListConfig => {
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
};
