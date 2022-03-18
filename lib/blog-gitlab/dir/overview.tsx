import { BlogDirOverview, BlogDirOverviewProps } from "@/lib/blog/dir/overview";
import { BlogGitLabRequest } from "../type";

type Props = BlogDirOverviewProps<BlogGitLabRequest>;

const getTitle = (props: Props): string => {
	const { project, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use project
	const repo = project.split("/").pop();
	if (repo !== "" && repo !== undefined) return repo;
	throw Error(`repo is undefined or empty string`);
};

export const BlogGitLabDirOverview = (props: Props): JSX.Element => (
	<BlogDirOverview
		dir={props.dir}
		getTitle={getTitle}
		request={props.request}
	/>
);
