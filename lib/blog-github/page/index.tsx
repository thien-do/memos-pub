import { BlogPage, BlogPageProps } from "@/lib/blog/page";
import { BlogDir } from "@/lib/blog/type";
import { BlogGitHubDir } from "../dir";
import { BlogGitHubRequest } from "../type";
import { BlogGitHubBreadcrumb } from "./breadcrumb";

type Props = BlogPageProps<BlogGitHubRequest>;

const getDir = (request: BlogGitHubRequest, dir: BlogDir): JSX.Element => (
	<BlogGitHubDir dir={dir} request={request} />
);

const getFavicon = (request: BlogGitHubRequest): string => {
	return `https://github.com/${request.owner}.png?size=48`;
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
