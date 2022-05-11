import type { GetStaticProps } from "next";
import { fetchBlogContent } from "../content/fetch";
import { parseBlogRequest } from "../request/parse";
import type { BlogPageProps, BlogPageParams } from "./type";

export const getBlogPageProps: GetStaticProps<
	BlogPageProps,
	BlogPageParams
> = async (context) => {
	const request = parseBlogRequest(context.params);
	const content = await fetchBlogContent(request);
	return {
		props: { content, request },
		revalidate: 1 * 60, // seconds
	};
};
