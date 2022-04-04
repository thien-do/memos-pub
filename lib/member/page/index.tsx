import { gitHubBlogGetFavicon } from "@/lib/blog-github/page";
import { BlogPage, BlogPageProps } from "@/lib/blog/page";
import { BlogDir } from "@/lib/blog/type";
import { MemberBlogBreadcrumb } from "../breadcrumb";
import { MemberBlogDir } from "../dir";
import { MemberBlogRequest } from "../type";

type Props = BlogPageProps<MemberBlogRequest>;

const getDir = (request: MemberBlogRequest, dir: BlogDir): JSX.Element => (
	<MemberBlogDir dir={dir} request={request} />
);

const getBreadcrumb = (request: MemberBlogRequest): JSX.Element => (
	<MemberBlogBreadcrumb request={request} />
);

export const MemberBlogPage = (props: Props): JSX.Element => (
	<BlogPage
		getDir={getDir}
		getFavicon={gitHubBlogGetFavicon}
		getBreadcrumb={getBreadcrumb}
		request={props.request}
		response={props.response}
	/>
);
