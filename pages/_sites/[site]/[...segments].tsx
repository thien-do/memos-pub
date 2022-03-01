import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
	params: any;
}

const Page: NextPage<PageProps> = (props) => {
	return <div>Ahihi {JSON.stringify(props.params)}</div>;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
	site: string;
	segments: string[];
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
	context
) => {
	const params = context.params;
	return {
		props: { params },
		revalidate: 60, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
