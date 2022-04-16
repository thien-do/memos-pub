import { BlogList } from "@/lib/blog/list/type";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { fetchGitHubBlogListReadme } from "./readme";
import { fetchGitHubBlogListConfig } from "./config";
import { GitHubRequest } from "@/lib/github/type";
import { GitHubDir } from "../../type";

interface Props<R extends GitHubRequest> {
	request: R;
	dir: GitHubDir;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogList = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogList> => {
	const { resolvers, dir, request } = props;

	const raw = props.response.map(toDirEntry);
	const entries = filterBlogListEntries(raw);
	const readme = await fetchGitHubBlogListReadme({ dir, request, resolvers });
	const config = await fetchGitHubBlogListConfig({ request });

	const list: BlogList = { type: "list", entries, readme, config };
	return list;
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
