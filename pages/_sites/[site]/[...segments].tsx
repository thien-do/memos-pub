import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

interface PageProps {}

const Page: NextPage<PageProps> = (props) => {
	return <div>Ahihi</div>;
};

export default Page;

/*
interface PageParams extends NodeJS.Dict<string | string[]> {
	segments: string[];
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
	context
) => {
	const segments = context.params?.segments;
	if (segments === undefined) throw Error("params.segments is not defined");

	const path = parseGitHubPath(segments);
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
*/
