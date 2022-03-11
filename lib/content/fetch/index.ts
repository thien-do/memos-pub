import { components, operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { makeContentDir } from "./dir";
import { getContentFile } from "./file";
import { ContentCommon, ContentRequest } from "../type";

const octokit = new Octokit({
	auth: process.env.MP_GH_AUTH,
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
		throw Error("Not support raw response");
	}

	// Single file json
	if (response.type === "file") {
		const r = response as components["schemas"]["content-file"];
		return getContentFile({ request, response: r });
	}

	throw Error(`Unknown content type "${response.type}"`);
};

export const fetchContent = async (
	request: ContentRequest
): Promise<ContentCommon> => {
	const { owner, path, repo } = request;
	const params = { owner, path, repo, mediaType: { format: "json" } };
	const response = await octokit.rest.repos.getContent(params);
	const content = parseResponse(request, response.data);

	return content;
};
