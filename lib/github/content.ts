import { components, operations } from "@octokit/openapi-types";
import {
	ContentCommon,
	ContentDir,
	ContentFile,
	ContentDirFile,
} from "../content/type";
import { markdownToHTML } from "../markdown/html";
import { isNotNull } from "../utils/not-null";
import { getGitHubKit } from "./kit";
import { GitHubPath } from "./path";

type Response =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];
type RawDirFile = components["schemas"]["content-directory"][number];

const ensureDirFileType = (type: string): type is ContentDirFile["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirFile = (raw: RawDirFile): ContentDirFile | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirFileType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const makeFile = async (markdown: string): Promise<ContentFile> => {
	const html = await markdownToHTML(markdown);
	return { type: "file", markdown, html };
};

const parseContent = async (response: Response): Promise<ContentCommon> => {
	// Directory
	if (Array.isArray(response)) {
		const files: ContentDirFile[] = response
			.map(toDirFile)
			.filter(isNotNull);
		const dir: ContentDir = { type: "dir", files };
		return dir;
	}
	// Single file raw
	if (typeof response === "string") {
		return await makeFile(response);
	}
	// Single file json
	if (response.type === "file") {
		if (!("content" in response)) throw Error("File doesn't have content");
		return makeFile(response.content);
	}
	throw Error(`Unknown content type "${response.type}"`);
};

export const fetchGitHubContent = async (
	path: GitHubPath
): Promise<ContentCommon> => {
	const kit = getGitHubKit();
	const format = path.path.endsWith(".md") ? "raw" : "json";
	const response = await kit.rest.repos.getContent({
		owner: path.owner,
		repo: path.repo,
		path: path.path,
		ref: path.branch,
		mediaType: { format },
	});
	const content = parseContent(response.data);
	return content;
};
