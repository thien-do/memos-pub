import { filterBlogDirEntry } from "@/lib/blog/fetch/dir-filter";
import { findBlogDirReadme } from "@/lib/blog/fetch/dir-readme";
import { BlogDir, BlogDirEntry } from "@/lib/blog/type";
import { components } from "@octokit/openapi-types";
import nodepath from "path";
import { GitHubBlogRequest } from "../type";
import { fetchBlogGitHub } from "./index";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

const ensureDirEntryType = (type: string): type is BlogDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirEntry = (raw: RawDirEntry): BlogDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const fetchReadme = async (
	request: GitHubBlogRequest,
	entries: BlogDir["entries"]
): Promise<BlogDir["readme"]> => {
	const readme = findBlogDirReadme(entries);
	if (readme === null) return null;
	const path = nodepath.join(request.path, readme.name);
	const file = await fetchBlogGitHub({ ...request, path });
	if (file.type !== "file") throw Error("README file is not file (2)");
	return file;
};

interface Props {
	request: GitHubBlogRequest;
	response: RawDir;
}

export const parseBlogGitHubDir = async (props: Props): Promise<BlogDir> => {
	const { request, response } = props;
	const raw = response.map(toDirEntry);
	const entries = filterBlogDirEntry(raw);
	const readme = await fetchReadme(request, entries);
	const dir: BlogDir = { type: "dir", entries, readme };
	return dir;
};
