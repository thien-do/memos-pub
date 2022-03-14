import { fetchContent } from "@/lib/content/fetch";
import { ContentCommon, ContentRequest } from "@/lib/content/type";
import { TenantPage } from "@/lib/tenant/page";
import { parseTenantRequest } from "@/lib/tenant/request";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface PageProps {
	content: ContentCommon;
	request: ContentRequest;
}

const Page: NextPage<PageProps> = (props) => {
	return <TenantPage request={props.request} content={props.content} />;
};

export default Page;

interface PageParams extends NodeJS.Dict<string | string[]> {
	tenant: string | undefined;
	slug: string[] | undefined;
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async (
	context
) => {
	const request = parseTenantRequest(context.params);
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
