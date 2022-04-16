import { filterBlogDirEntries } from "@/lib/blog/dir/utils/filter";
import { findBlogDirReadme } from "@/lib/blog/dir/utils/readme";
import { BlogDir, BlogDirEntry } from "@/lib/blog/dir/type";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components } from "@octokit/openapi-types";
import nodepath from "path";
import { GitHubBlogRequest } from "../type";
import { fetchGitHubBlog } from "./index";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

interface Props<R extends GitHubBlogRequest> {
	request: R;
	response: RawDir;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogDir = async <R extends GitHubBlogRequest>(
	props: Props<R>
): Promise<BlogDir> => {
	const raw = props.response.map(toDirEntry);
	const entries = filterBlogDirEntries(raw);
	const readme = await fetchReadme(props, entries);
	const config = await fetchConfig(props, entries);
	const dir: BlogDir = { type: "dir", entries, readme, config };
	return dir;
};

const toDirEntry = (raw: RawDirEntry): BlogDirEntry | null => {
	const ensureDirEntryType = (type: string): type is BlogDirEntry["type"] => {
		return ["file", "dir"].includes(type);
	};

	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const fetchReadme = async <R extends GitHubBlogRequest>(
	props: Props<R>,
	entries: BlogDir["entries"]
): Promise<BlogDir["readme"]> => {
	const request = { ...props.request };
	const { resolvers } = props;
	const readme = findBlogDirReadme(entries);
	if (readme === null) return null;
	request.path = nodepath.join(request.path, readme.name);
	const file = await fetchGitHubBlog({ request, resolvers });
	if (file.type !== "file") throw Error("README file is not file (2)");
	return file;
};
