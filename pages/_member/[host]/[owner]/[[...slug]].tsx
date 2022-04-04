import { MemberBlogRequest } from "@/lib/member/type";
import { BlogResponse } from "@/lib/blog/type";
import {
	GitHubBlogPageParams,
	parseGitHubBlogRequest,
} from "@/lib/github/request";
import type { GetStaticPaths, GetStaticProps } from "next";
import { fetchGitHubBlog } from "@/lib/github/fetch";
import { memberMdxResolvers } from "@/lib/member/mdx";

export { MemberBlogPage as default } from "@/lib/member/blog";

interface PageParams extends GitHubBlogPageParams {
	host: string | undefined;
}

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetStaticProps<
	{ request: MemberBlogRequest; response: BlogResponse },
	PageParams
> = async (context) => {
	const githubRequest = parseGitHubBlogRequest(context.params);

	const host = context.params?.host;
	if (host === undefined) throw Error("Host is undefined");
	const request: MemberBlogRequest = { ...githubRequest, host };

	const resolvers = memberMdxResolvers;
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
