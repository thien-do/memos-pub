import { fetchBlogGitLab } from "@/lib/blog-gitlab/fetch";
import { parseBlogGitLabRequest } from "@/lib/blog-gitlab/fetch/request";
import { BlogGitLabRequest } from "@/lib/blog-gitlab/type";
import { BlogPageProps } from "@/lib/blog/page";
import type { GetStaticPaths, GetStaticProps } from "next";

export { BlogGitLabPage as default } from "@/lib/blog-gitlab/page";

interface PageParams extends NodeJS.Dict<string | string[]> {
	slug: string[] | undefined;
}

type GetProps = GetStaticProps<BlogPageProps<BlogGitLabRequest>, PageParams>;

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetProps = async (context) => {
	const request = parseBlogGitLabRequest(context.params);
	const response = await fetchBlogGitLab(request);
	return {
		props: { request, response },
		revalidate: 5 * 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
