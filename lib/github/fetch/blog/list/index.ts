import { filterBlogListEntries } from "@/lib/blog/list/utils/filter";
import { findBlogListReadme } from "@/lib/blog/list/utils/readme";
import { BlogList, BlogListEntry } from "@/lib/blog/list/type";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { components } from "@octokit/openapi-types";
import nodepath from "path";
import { GitHubRequest } from "../type";
import { fetchGitHubBlog } from "./index";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

interface Props<R extends GitHubRequest> {
	request: R;
	response: RawDir;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogList = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogList> => {
	const raw = props.response.map(toDirEntry);
	const entries = filterBlogListEntries(raw);
	const readme = await fetchReadme(props, entries);
	const config = await fetchConfig(props, entries);
	const dir: BlogList = { type: "dir", entries, readme, config };
	return dir;
};

const toDirEntry = (raw: RawDirEntry): BlogListEntry | null => {
	const ensureDirEntryType = (
		type: string
	): type is BlogListEntry["type"] => {
		return ["file", "dir"].includes(type);
	};

	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const fetchReadme = async <R extends GitHubRequest>(
	props: Props<R>,
	entries: BlogList["entries"]
): Promise<BlogList["readme"]> => {
	const request = { ...props.request };
	const { resolvers } = props;
	const readme = findBlogListReadme(entries);
	if (readme === null) return null;
	request.path = nodepath.join(request.path, readme.name);
	const file = await fetchGitHubBlog({ request, resolvers });
	if (file.type !== "file") throw Error("README file is not file (2)");
	return file;
};
