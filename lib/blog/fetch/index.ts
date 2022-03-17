import { components, operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { BlogRequest, BlogResponse } from "../type";
import { parseBlogDir } from "./dir";
import { parseBlogError } from "./error";
import { parseBlogFile } from "./file";

const octokit = new Octokit({
	auth: process.env.MP_GH_AUTH,
});

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

const parseResponse = async (
	request: BlogRequest,
	response: RawResponse
): Promise<BlogResponse> => {
	// Directory
	if (Array.isArray(response)) {
		return await parseBlogDir({ request, response });
	}

	// Single file raw
	if (typeof response === "string") {
		throw Error("Not support raw response");
	}

	// Single file json
	if (response.type === "file") {
		const r = response as components["schemas"]["content-file"];
		return parseBlogFile({ request, response: r });
	}

	throw Error(`Unknown content type "${response.type}"`);
};

export const fetchBlog = async (
	request: BlogRequest
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
		return parseBlogError(request, error);
	}
};
