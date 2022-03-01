import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { fetchGitHubContent } from "../lib/github/content";
import { parseGitHubPath } from "../lib/github/path";
import { PostPage } from "../lib/post/page";
import { fetchSource } from "../lib/sources/fetch";

interface PageProps {
	html: string;
}

const Page: NextPage<PageProps> = (props) => {
	// return <PostPage html={props.html} />;
	return <div>Hello</div>;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
	segments: string[];
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
	context
) => {
	const segments = context.params?.segments;
	if (segments === undefined) throw Error("params.segments is not defined");
	// const html = await fetchSource(segments);

	const path = parseGitHubPath(segments);
	await fetchGitHubContent(path);

	return {
		props: { html: "" },
		revalidate: 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
