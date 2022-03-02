import { fetchContent } from "@/lib/content/fetch";
import { ContentCommon, ContentRequest } from "@/lib/content/type";
import { PageCommon } from "@/lib/page/common";
import { getContentRequestFromPage } from "@/lib/page/request";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface PageProps {
	content: ContentCommon;
	request: ContentRequest;
}

const Page: NextPage<PageProps> = (props) => {
	return <PageCommon request={props.request} content={props.content} />;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
	tenant: string | undefined;
	slug: string[] | undefined;
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
	context
) => {
	const request = getContentRequestFromPage(context.params);
	const content = await fetchContent(request);
	return {
		props: { content, request },
		revalidate: 60 * 5, // seconds
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});
