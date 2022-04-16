import { BlogList } from "@/lib/blog/list/type";
import { GitHubRequest } from "@/lib/github/type";
import { GitHubDir, GitHubDirEntry } from "../../type";
import { join } from "path";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { fetchGitHubBlogContent } from "../content";

interface Props<R extends GitHubRequest> {
	dir: GitHubDir;
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export const fetchGitHubBlogListReadme = async <R extends GitHubRequest>(
	props: Props<R>
): Promise<BlogList["readme"]> => {
	const { dir } = props;
	const entry = dir.find(isReadme);
	if (entry === undefined) return null;

	const request = { ...props.request };
	request.path = join(request.path, entry.name);

	const { resolvers } = props;
	const post = await fetchGitHubBlogContent({ request, resolvers });
	if (post.type !== "post") throw Error("README file is not a post");
	return post;
};

/** Case in-sensitive */
const README_FILES = ["readme.md", "readme.mdx", "index.md", "index.mdx"];

const isReadme = (entry: GitHubDirEntry): boolean => {
	const found = README_FILES.some((candidate) => {
		return entry.name.toLowerCase() === candidate;
	});
	return found;
};
