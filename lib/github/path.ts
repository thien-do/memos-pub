import { components, operations } from "@octokit/openapi-types";
import { markdownToHTML } from "../markdown/html";
import { isNotNull } from "../utils/not-null";
import { getGitHubKit } from "./kit";

interface ContentDirEntry {
	type: "file" | "dir";
	name: string;
}

interface ContentDir {
	type: "dir";
	entries: ContentDirEntry[];
}

interface ContentFile {
	type: "file";
	markdown: string;
	html: string;
}

type ContentCommon = ContentDir | ContentFile;

/**
 * Params to get a resource from GitHub
 */
interface ContentRequest {
	/** e.g. "thien-do" */
	owner: string;
	/** e.g. "notes" */
	repo: string;
	/** e.g. "dir/foo", "dir/foo/hello.md" */
	path: string;
}

/**
 * Params of a tenant page request
 */
interface PageRequest {
	/** e.g. "thien-do" */
	tenant: string;
	/** e.g. ["notes", "dir", "foo", "hello.md"] */
	slug: string[];
}

const toContentRequest = (page: PageRequest): ContentRequest => {
	const { slug, tenant } = page;
	const [repo, ...segments] = slug;
	const path = segments.join("/");
	const content: ContentRequest = { owner: tenant, repo, path };
	return content;
};

const toPageRequest = (content: ContentRequest): PageRequest => {
	const { owner, path, repo } = content;
	const slug: string[] = [repo, ...path.split("/")];
	const page: PageRequest = { slug, tenant: owner };
	return page;
};

type ContentRawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];
type ContentRawDirEntry = components["schemas"]["content-directory"][number];

const ensureContentDirEntryType = (
	type: string
): type is ContentDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toContentDirEntry = (raw: ContentRawDirEntry): ContentDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureContentDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const makeContentFile = async (markdown: string): Promise<ContentFile> => {
	const html = await markdownToHTML(markdown);
	return { type: "file", markdown, html };
};

const parseContentResponse = async (
	response: ContentRawResponse
): Promise<ContentCommon> => {
	// Directory
	if (Array.isArray(response)) {
		const entries: ContentDirEntry[] = response
			.map(toContentDirEntry)
			.filter(isNotNull);
		const dir: ContentDir = { type: "dir", entries };
		return dir;
	}
	// Single file raw
	if (typeof response === "string") {
		return await makeContentFile(response);
	}
	// Single file json
	if (response.type === "file") {
		if (!("content" in response)) throw Error("File doesn't have content");
		return makeContentFile(response.content);
	}
	throw Error(`Unknown content type "${response.type}"`);
};

const fetchContent = async (
	request: ContentRequest
): Promise<ContentCommon> => {
	const kit = getGitHubKit();
	const { owner, path, repo } = request;
	const format = request.path.endsWith(".md") ? "raw" : "json";
	const params = { owner, path, repo, mediaType: { format } };
	const response = await kit.rest.repos.getContent(params);
	const content = parseContentResponse(response.data);
	return content;
};
