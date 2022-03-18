import { BlogDirOverview, BlogDirOverviewProps } from "@/lib/blog/dir/overview";
import { BlogGitHubRequest } from "../type";

type Props = BlogDirOverviewProps<BlogGitHubRequest>;

const getTitle = (props: Props): string => {
	const { repo, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use repo
	return repo;
};

export const BlogGitHubDirOverview = (props: Props): JSX.Element => (
	<BlogDirOverview
		dir={props.dir}
		getTitle={getTitle}
		request={props.request}
	/>
);
