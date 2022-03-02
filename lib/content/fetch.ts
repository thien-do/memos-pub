import { components, operations } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { isNotNull } from "../utils/not-null";
import {
	ContentCommon,
	ContentDir,
	ContentDirEntry,
	ContentFile,
	ContentRequest,
} from "./type";

const octokit = new Octokit({});

type RawResponse =
	operations["repos/get-content"]["responses"]["200"]["content"]["application/json"];
type RawDirEntry = components["schemas"]["content-directory"][number];

const ensureDirEntryType = (type: string): type is ContentDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirEntry = (raw: RawDirEntry): ContentDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const makeFile = async (body: string): Promise<ContentFile> => {
	return { type: "file", body };
};

const isValidEntry = (raw: RawDirEntry): boolean => {
	if (raw.name.startsWith(".")) return false;
	if (raw.name.startsWith("_")) return false;
	if (raw.name.endsWith(".md")) return true;
	if (raw.type === "dir") return true;
	return false;
};

const parseResponse = async (response: RawResponse): Promise<ContentCommon> => {
	// Directory
	if (Array.isArray(response)) {
		const entries: ContentDirEntry[] = response
			.filter(isValidEntry)
			.map(toDirEntry)
			.filter(isNotNull);
		const dir: ContentDir = { type: "dir", entries };
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

export const fetchContent = async (
	request: ContentRequest
): Promise<ContentCommon> => {
	const { owner, path, repo } = request;
	const format = request.path.endsWith(".md") ? "raw" : "json";
	const params = { owner, path, repo, mediaType: { format } };
	const response = await octokit.rest.repos.getContent(params);
	const content = parseResponse(response.data);
	return content;
};
