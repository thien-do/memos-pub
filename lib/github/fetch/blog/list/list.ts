import { BlogList } from "@/lib/blog/list/type";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { fetchGitHubBlogListReadme } from "./readme";
import { fetchGitHubBlogListConfig } from "./config";
import { GitHubRequest } from "@/lib/github/type";
import { GitHubDir } from "../../type";
import { getGitHubBlogEntries } from "./entry";

interface Props<R extends GitHubRequest> {
	request: R;
	dir: GitHubDir;
	resolvers: MdxUrlResolvers<R>;
}

export const parseGitHubBlogList = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogList> => {
	const { resolvers, dir, request } = props;

	const [readme, config] = await Promise.all([
		fetchGitHubBlogListReadme({ dir, request, resolvers }),
		fetchGitHubBlogListConfig({ request }),
	]);
	const entries = getGitHubBlogEntries({ config, dir });

	const list: BlogList = { type: "list", entries, readme, config };
	return list;
};
