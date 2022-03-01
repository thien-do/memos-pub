import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { ContentCommon } from "../lib/content/type";
import { ContentPage } from "../lib/content/page";
import { fetchGitHubContent } from "../lib/github/content";
import { parseGitHubPath } from "../lib/github/path";
import { expandPath } from "../../../lib/path/expand";

interface PageProps {
	content: ContentCommon;
	segments: string[];
}

const Page: NextPage<PageProps> = (props) => {
	return <ContentPage segments={props.segments} content={props.content} />;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
	site: string | undefined;
	segments: string[];
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
	context
) => {
	if (context.params === undefined) throw Error("Params is not defined");
	const { site, segments } = context.params;
	const ghSegments = expandPath({ site, segments });
	const path = parseGitHubPath(ghSegments);
	const content = await fetchGitHubContent(path);
	return {
		props: { content, segments },
		revalidate: 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
