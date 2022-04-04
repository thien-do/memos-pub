import { fetchBlogGitHub } from "@/lib/blog-github/fetch";
import { parseBlogGitHubRequest } from "@/lib/blog-github/fetch/request";
import { MemberBlogRequest } from "@/lib/blog-member/type";
import { BlogPageProps } from "@/lib/blog/page";
import type { GetStaticPaths, GetStaticProps } from "next";

export { MemberBlogPage as default } from "@/lib/blog-member/page";

interface PageParams extends NodeJS.Dict<string | string[]> {
	host: string | undefined;
	owner: string | undefined;
	slug: string[] | undefined;
}

type GetProps = GetStaticProps<BlogPageProps<MemberBlogRequest>, PageParams>;

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetProps = async (context) => {
	const request1 = parseBlogGitHubRequest(context.params);

	const response = await fetchBlogGitHub(request1);
	const host = context.params?.host;
	if (host === undefined) throw Error("Host is undefined");
	const request: MemberBlogRequest = { ...request1, host };
	return {
		props: { response, request },
		revalidate: 5 * 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
