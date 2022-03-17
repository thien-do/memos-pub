import { fetchBlogGitlab } from "@/lib/blog-gitlab/fetch";
import { parseBlogGitlabRequest } from "@/lib/blog-gitlab/fetch/request";
import { BlogGitlabPageProps } from "@/lib/blog-gitlab/page";
import type { GetStaticPaths, GetStaticProps } from "next";

export { BlogGitlabPage as default } from "@/lib/blog-gitlab/page";

interface PageParams extends NodeJS.Dict<string | string[]> {
	slug: string[] | undefined;
}

type GetProps = GetStaticProps<BlogGitlabPageProps, PageParams>;

// getStaticProps and getStaticPaths cannot be re-export like BlogPage as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetProps = async (context) => {
	const request = parseBlogGitlabRequest(context.params);
	const response = await fetchBlogGitlab(request);
	return {
		props: { request, response },
		revalidate: 60 * 5, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
