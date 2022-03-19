import { BlogPage, BlogPageProps } from "@/lib/blog/page";
import { BlogDir } from "@/lib/blog/type";
import { BlogGitLabDir } from "../dir";
import { BlogGitLabRequest } from "../type";
import { BlogGitLabBreadcrumb } from "./breadcrumb";

type Props = BlogPageProps<BlogGitLabRequest>;

const getDir = (request: BlogGitLabRequest, dir: BlogDir): JSX.Element => (
	<BlogGitLabDir dir={dir} request={request} />
);

const getFavicon = (): string => {
	return "https://gitlab.com/favicon.png";
};

const getBreadcrumb = (request: BlogGitLabRequest): JSX.Element => (
	<BlogGitLabBreadcrumb request={request} />
);

export const BlogGitLabPage = (props: Props): JSX.Element => (
	<BlogPage
		getDir={getDir}
		getFavicon={getFavicon}
		getBreadcrumb={getBreadcrumb}
		request={props.request}
		response={props.response}
	/>
);
