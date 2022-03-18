import { components } from "@octokit/openapi-types";
import nodepath from "path";
import { BlogDir, BlogDirEntry, BlogRequest } from "../type";
import { fetchBlog } from "./index";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

const isNotNull = <Value>(value: Value | null): value is Value => {
	if (value === null) return false;
	// https://stackoverflow.com/a/46700791
	const _test: Value = value;
	return true;
};

const ensureDirEntryType = (type: string): type is BlogDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirEntry = (raw: RawDirEntry): BlogDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const isValidEntry = (raw: RawDirEntry): boolean => {
	if (raw.name.startsWith(".")) return false;
	if (raw.name.startsWith("_")) return false;
	if (raw.name.endsWith(".md")) return true;
	if (raw.name.endsWith(".markdown")) return true;
	if (raw.name.endsWith(".mdx")) return true;
	if (raw.type === "dir") return true;
	return false;
};

/** Case in-sensitive */
const README_FILES = ["readme.md", "readme.mdx", "index.md", "index.mdx"];

const isReadmeFile = (entry: BlogDirEntry) => {
	const found = README_FILES.some((candidate) => {
		return entry.name.toLowerCase() === candidate;
	});
	return found;
};

const fetchReadme = async (
	request: BlogRequest,
	entries: BlogDir["entries"]
): Promise<BlogDir["readme"]> => {
	const readme = entries.find(isReadmeFile);
	if (readme === undefined) return null;
	if (readme.type === "dir") throw Error("README file is not file (1)");
	const path = nodepath.join(request.path, readme.name);
	const content = await fetchBlog({ ...request, path });
	if (content.type !== "file") throw Error("README file is not file (2)");
	return content;
};

interface Props {
	request: BlogRequest;
	response: RawDir;
}

export const parseBlogDir = async (props: Props): Promise<BlogDir> => {
	const { request, response } = props;
	const entries: BlogDirEntry[] = response
		.filter(isValidEntry)
		.map(toDirEntry)
		.filter(isNotNull);
	const readme = await fetchReadme(request, entries);

	const dir: BlogDir = { type: "dir", entries, readme };
	return dir;
};
