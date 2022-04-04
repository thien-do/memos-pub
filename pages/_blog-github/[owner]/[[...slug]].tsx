import { BlogResponse } from "@/lib/blog/type";
import { fetchGitHubBlog } from "@/lib/github/fetch";
import { gitHubMdxResolvers } from "@/lib/github/mdx/url";
import { parseGitHubBlogRequest } from "@/lib/github/request";
import { GitHubBlogRequest } from "@/lib/github/type";
import type { GetStaticPaths, GetStaticProps } from "next";

export { GitHubBlogPage as default } from "@/lib/github/blog";

interface PageParams extends NodeJS.Dict<string | string[]> {
	owner: string | undefined;
	slug: string[] | undefined;
}

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetStaticProps<
	{ request: GitHubBlogRequest; response: BlogResponse },
	PageParams
> = async (context) => {
	const request = parseGitHubBlogRequest(context.params);
	const resolvers = gitHubMdxResolvers;
	const response = await fetchGitHubBlog({ request, resolvers });
	return {
		props: { response, request },
		revalidate: 5 * 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
