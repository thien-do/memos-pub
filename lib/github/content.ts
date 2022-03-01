import { components, operations } from "@octokit/openapi-types";
import { ContentCommon } from "../content/common";
import { ContentDir, ContentDirFile } from "../content/dir";
import { ContentFile } from "../content/file";
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

const parseContent = (response: Response): ContentCommon => {
	// Directory
	if (Array.isArray(response)) {
		const files: ContentDirFile[] = response
			.map(toDirFile)
			.filter(isNotNull);
		const dir: ContentDir = { files };
		return dir;
	}
	// Single file
	if (response.type === "file") {
		if (!("content" in response)) throw Error("File doesn't have content");
		const file: ContentFile = { content: response.content };
		return file;
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
