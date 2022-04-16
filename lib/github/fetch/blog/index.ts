import { BlogResponse } from "@/lib/blog/type";
import { getEnvGitHubToken } from "@/lib/env";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components, operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { GitHubRequest } from "../type";
import { parseGitHubBlogList } from "./dir";
import { parseGitHubBlogError } from "./error";
import { parseGitHubBlogFile } from "./file";

const octokit = new Octokit({
	// Doesn't really need "auth" but provide to have better rate limit
	auth: getEnvGitHubToken(),
});

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

const parseResponse = async <R extends GitHubRequest>(
	props: Props<R>,
	response: RawResponse
): Promise<BlogResponse> => {
	const { request, resolvers } = props;

	// Directory
	if (Array.isArray(response)) {
		return await parseGitHubBlogList({ request, response, resolvers });
	}

	// Single file raw
	if (typeof response === "string") {
		throw Error("Not support raw response");
	}

	// Single file json
	if (response.type === "file") {
		const r = response as components["schemas"]["content-file"];
		return parseGitHubBlogFile({ request, response: r, resolvers });
	}

	throw Error(`Unknown content type "${response.type}"`);
};

interface Props<R extends GitHubRequest> {
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const fetchGitHubBlog = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogResponse> => {
	const { owner, path, repo } = props.request;
	try {
		const get = octokit.rest.repos.getContent;
		const mediaType = { format: "json" };
		const raw = await get({ owner, path, repo, mediaType });
		const response = parseResponse(props, raw.data);
		return response;
	} catch (error) {
		return parseGitHubBlogError(props.request, error);
	}
};
