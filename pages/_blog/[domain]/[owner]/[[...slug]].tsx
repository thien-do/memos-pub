import { fetchBlogContent } from "@/lib/blog/content/fetch";
import { BlogContentMainProps } from "@/lib/blog/content/main";
import { BlogPageParams, parseBlogRequest } from "@/lib/blog/request/parse";
import type { GetStaticPaths, GetStaticProps } from "next";

export { BlogContentMain as default } from "@/lib/blog/content/main";

// getStaticProps and getStaticPaths cannot be re-exported like components as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetStaticProps<
	BlogContentMainProps,
	BlogPageParams
> = async (context) => {
	const request = parseBlogRequest(context.params);
	const content = await fetchBlogContent(request);
	return {
		props: { content, request },
		revalidate: 1 * 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
