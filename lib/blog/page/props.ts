import type { GetStaticProps } from "next";
import { fetchBlogContent } from "../content/fetch";
import { parseBlogRequest } from "../request/parse";
import type { BlogPageProps, BlogPageParams } from "./type";

export const getBlogPageProps: GetStaticProps<
	BlogPageProps,
	BlogPageParams
> = async (context) => {
	const request = parseBlogRequest(context.params);
	const { content, config } = await fetchBlogContent(request);
	return {
		props: { content, request, config },
		revalidate: 1 * 60, // seconds
	};
};
