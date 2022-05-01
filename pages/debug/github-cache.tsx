import { LayoutNone } from "@/lib/app/layout/layout";
import { getGitHubContentCache } from "@/lib/github/fetch/content";

function GithubCache({ data }: any) {
	return <div>{JSON.stringify(data)}</div>;
}

export async function getServerSideProps() {
	const cache = getGitHubContentCache();
	const data = [...cache.keys()];
	return { props: { data } };
}

GithubCache.Layout = LayoutNone;

export default GithubCache;
