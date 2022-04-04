import { BlogResponse } from "@/lib/blog/type";
import { components, operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { GitHubBlogRequest } from "../type";
import { parseBlogGitHubDir } from "./dir";
import { parseBlogGitHubError } from "./error";
import { parseBlogGitHubFile } from "./file";

const octokit = new Octokit({
	auth: process.env.MP_GH_AUTH,
});

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

const parseResponse = async (
	request: GitHubBlogRequest,
	response: RawResponse
): Promise<BlogResponse> => {
	// Directory
	if (Array.isArray(response)) {
		return await parseBlogGitHubDir({ request, response });
	}

	// Single file raw
	if (typeof response === "string") {
		throw Error("Not support raw response");
	}

	// Single file json
	if (response.type === "file") {
		const r = response as components["schemas"]["content-file"];
		return parseBlogGitHubFile({ request, response: r });
	}

	throw Error(`Unknown content type "${response.type}"`);
};

export const fetchBlogGitHub = async (
	request: GitHubBlogRequest
): Promise<BlogResponse> => {
	try {
		const raw = await octokit.rest.repos.getContent({
			owner: request.owner,
			repo: request.repo,
			path: request.path,
			mediaType: { format: "json" },
		});
		const response = parseResponse(request, raw.data);
		return response;
	} catch (error) {
		return parseBlogGitHubError(request, error);
	}
};
