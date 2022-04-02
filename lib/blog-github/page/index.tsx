import { BlogPage, BlogPageProps } from "@/lib/blog/page";
import { BlogDir } from "@/lib/blog/type";
import { BlogGitHubBreadcrumb } from "../breadcrumb";
import { BlogGitHubDir } from "../dir";
import { BlogGitHubRequest } from "../type";

type Props = BlogPageProps<BlogGitHubRequest>;

const getDir = (request: BlogGitHubRequest, dir: BlogDir): JSX.Element => (
	<BlogGitHubDir dir={dir} request={request} />
);

const getFavicon = (request: BlogGitHubRequest): string => {
	return `https://funcs.dev/api/favicon?user=${request.owner}&size=48`;
};

const getBreadcrumb = (request: BlogGitHubRequest): JSX.Element => (
	<BlogGitHubBreadcrumb request={request} />
);

export const BlogGitHubPage = (props: Props): JSX.Element => (
	<BlogPage
		getDir={getDir}
		getFavicon={getFavicon}
		getBreadcrumb={getBreadcrumb}
		request={props.request}
		response={props.response}
	/>
);
