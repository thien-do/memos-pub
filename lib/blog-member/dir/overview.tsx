import { BlogDirOverview, BlogDirOverviewProps } from "@/lib/blog/dir/overview";
import { MemberBlogRequest } from "../type";

type Props = BlogDirOverviewProps<MemberBlogRequest>;

const getTitle = (props: Props): string => {
	const { host, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use host
	return host;
};

export const MemberBlogDirOverview = (props: Props): JSX.Element => (
	<BlogDirOverview
		dir={props.dir}
		getTitle={getTitle}
		request={props.request}
	/>
);
