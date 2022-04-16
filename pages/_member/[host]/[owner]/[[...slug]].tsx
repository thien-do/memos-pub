import { GitHubBlogPageParams, parseGitHubRequest } from "@/lib/github/request";
import type { GetStaticPaths, GetStaticProps } from "next";
import { memberMdxResolvers } from "@/lib/member/mdx";
import { BlogContent } from "@/lib/blog/content/type";
import { MemberRequest } from "@/lib/member/type";
import { fetchGitHubBlogContent } from "@/lib/github/fetch/blog/content";

export { MemberBlogPage as default } from "@/lib/member/blog";

interface PageParams extends GitHubBlogPageParams {
	host: string | undefined;
}

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetStaticProps<
	{ request: MemberRequest; content: BlogContent },
	PageParams
> = async (context) => {
	const githubRequest = parseGitHubRequest(context.params);
	const host = context.params?.host;
	if (host === undefined) throw Error("Host is undefined");
	const request: MemberRequest = { ...githubRequest, host };

	const resolvers = memberMdxResolvers;
	const content = await fetchGitHubBlogContent({ request, resolvers });

	return {
		props: { content, request },
		revalidate: 5 * 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
