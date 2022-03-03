import { operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { makeContentDir } from "./dir";
import { getContentFile } from "./file";
import { ContentCommon, ContentRequest } from "./type";

const octokit = new Octokit({
	auth: process.env.GH_AUTH,
});

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

const parseResponse = async (
	request: ContentRequest,
	response: RawResponse
): Promise<ContentCommon> => {
	// Directory
	if (Array.isArray(response)) {
		return makeContentDir(response);
	}
	// Single file raw
	if (typeof response === "string") {
		return await getContentFile({ request, content: response });
	}
	// Single file json
	if (response.type === "file") {
		if (!("content" in response)) throw Error("File doesn't have content");
		return getContentFile({ request, content: response.content });
	}
	throw Error(`Unknown content type "${response.type}"`);
};

const isMarkdown = (request: ContentRequest): boolean => {
	if (request.path.endsWith(".md")) return true;
	if (request.path.endsWith(".mdx")) return true;
	return false;
};

export const fetchContent = async (
	request: ContentRequest
): Promise<ContentCommon> => {
	const { owner, path, repo } = request;
	const format = isMarkdown(request) ? "raw" : "json";
	const params = { owner, path, repo, mediaType: { format } };
	const response = await octokit.rest.repos.getContent(params);
	const content = parseResponse(request, response.data);

	return content;
};
