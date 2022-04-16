import { BlogDirConfig } from "@/lib/blog/dir/config/type";
import { operations } from "@octokit/openapi-types";
import { GitHubBlogRequest } from "../../type";
import { parseGitHubBlogError } from "../error";
import { getOctokit } from "../octokit";

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

interface Props<R extends GitHubBlogRequest> {
	request: R;
}

export const fetchGitHubBlogDirConfig = async <R extends GitHubBlogRequest>(
	props: Props<R>
): Promise<BlogDirConfig | null> => {
	const { owner, path, repo } = props.request;
	try {
		const get = getOctokit().rest.repos.getContent;
		const mediaType = { format: "json" };
		const raw = await get({ owner, path, repo, mediaType });
		const response = parseResponse(raw.data);
		return response;
	} catch (raw) {
		const error = parseGitHubBlogError(props.request, raw);
		// BlogDirConfig is optional
		if (error.status === 404) return null;
		throw error;
	}
};

const parseResponse = (raw: RawResponse): BlogDirConfig => {
	// Directory
	if (Array.isArray(raw)) throw Error("Config cannot be dir");

	// Single file raw
	if (typeof raw === "string") throw Error("Not support raw response");

	// Single file json
	if (raw.type === "file") {
		if (!("content" in raw)) throw Error("File doesn't have content");
		const content = Buffer.from(raw.content, "base64").toString();
		const config = JSON.parse(content) as BlogDirConfig;
		return config;
	}

	throw Error(`Unknown content type "${raw.type}"`);
};
