import { fetchBlog } from "@/lib/blog/fetch";
import { parseBlogRequest } from "@/lib/blog/fetch/request";
import { BlogPageProps } from "@/lib/blog/page";
import type { GetStaticPaths, GetStaticProps } from "next";

export { BlogPage as default } from "@/lib/blog/page";

interface PageParams extends NodeJS.Dict<string | string[]> {
	owner: string | undefined;
	slug: string[] | undefined;
}

type GetProps = GetStaticProps<BlogPageProps, PageParams>;

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetProps = async (context) => {
	const request = parseBlogRequest(context.params);
	const response = await fetchBlog(request);
	return {
		props: { response, request },
		revalidate: 60 * 5, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async (context) => ({
	paths: [],
	fallback: "blocking",
});
