import { BlogContent } from "@/lib/blog/content/type";
import { fetchGitHubBlogContent } from "@/lib/github/fetch/blog/content";
import { gitHubMdxResolvers } from "@/lib/github/mdx";
import { GitHubBlogPageParams, parseGitHubRequest } from "@/lib/github/request";
import { GitHubRequest } from "@/lib/github/type";
import type { GetStaticPaths, GetStaticProps } from "next";

export { GitHubBlog as default } from "@/lib/github/blog";

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetStaticProps<
	{ request: GitHubRequest; content: BlogContent },
	GitHubBlogPageParams
> = async (context) => {
	const request = parseGitHubRequest(context.params);
	const resolvers = gitHubMdxResolvers;
	const content = await fetchGitHubBlogContent({ request, resolvers });
	return {
		props: { content, request },
		revalidate: 1 * 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
