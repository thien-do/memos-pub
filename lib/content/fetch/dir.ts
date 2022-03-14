import { components } from "@octokit/openapi-types";
import { isNotNull } from "@/lib/utils/not-null";
import { ContentDir, ContentDirEntry, ContentRequest } from "../type";
import { fetchContent } from ".";
import nodepath from "path";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

const ensureDirEntryType = (type: string): type is ContentDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirEntry = (raw: RawDirEntry): ContentDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const isValidEntry = (raw: RawDirEntry): boolean => {
	if (raw.name.startsWith(".")) return false;
	if (raw.name.startsWith("_")) return false;
	if (raw.name.endsWith(".md")) return true;
	if (raw.name.endsWith(".mdx")) return true;
	if (raw.type === "dir") return true;
	return false;
};

/** Case in-sensitive */
const README_FILES = ["readme.md", "readme.mdx", "index.md", "index.mdx"];

const isReadmeFile = (entry: ContentDirEntry) => {
	const found = README_FILES.some((candidate) => {
		return entry.name.toLowerCase() === candidate;
	});
	return found;
};

const fetchReadme = async (
	request: ContentRequest,
	entries: ContentDir["entries"]
): Promise<ContentDir["readme"]> => {
	const readme = entries.find(isReadmeFile);
	if (readme === undefined) return null;
	if (readme.type === "dir") throw Error("README file cannot be dir (1)");
	const path = nodepath.join(request.path, readme.name);
	const content = await fetchContent({ ...request, path });
	if (content.type === "dir") throw Error("README file cannot be dir (2)");
	return content;
};

interface Props {
	request: ContentRequest;
	response: RawDir;
}

export const parseContentDir = async (props: Props): Promise<ContentDir> => {
	const { request, response } = props;
	const entries: ContentDirEntry[] = response
		.filter(isValidEntry)
		.map(toDirEntry)
		.filter(isNotNull);
	const readme = await fetchReadme(request, entries);
	const dir: ContentDir = { type: "dir", entries, readme };
	return dir;
};
