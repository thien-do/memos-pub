import { BlogResponse } from "@/lib/blog/type";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components, operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { GitHubBlogRequest } from "../type";
import { parseGitHubBlogDir } from "./dir";
import { parseGitHubBlogError } from "./error";
import { parseGitHubBlogFile } from "./file";

const octokit = new Octokit({
	auth: process.env.MP_GH_AUTH,
});

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];

const parseResponse = async <R extends GitHubBlogRequest>(
	props: Props<R>,
	response: RawResponse
): Promise<BlogResponse> => {
	const { request, resolvers } = props;

	// Directory
	if (Array.isArray(response)) {
		return await parseGitHubBlogDir({ request, response, resolvers });
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

interface Props<R extends GitHubBlogRequest> {
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const fetchGitHubBlog = async <R extends GitHubBlogRequest>(
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
