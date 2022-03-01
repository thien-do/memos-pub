import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ContentCommon } from "../lib/content/type";
import { ContentPage } from "../lib/content/page";
import { fetchGitHubContent } from "../lib/github/content";
import { parseGitHubPath } from "../lib/github/path";

interface PageProps {
	content: ContentCommon;
}

const Page: NextPage<PageProps> = (props) => {
	return <ContentPage content={props.content} />;
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
	const content = await fetchGitHubContent(path);

	return {
		props: { content },
		revalidate: 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
