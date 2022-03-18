import {
	BlogDirOverviewGetTitle,
	makeBlogDirOverview,
} from "@/lib/blog/dir/overview";
import { BlogGitlabRequest } from "../type";

type GetTitle = BlogDirOverviewGetTitle<BlogGitlabRequest>;

const getTitle: GetTitle = (props): string => {
	const { project, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use project
	const repo = project.split("/").pop();
	if (repo !== "" && repo !== undefined) return repo;
	throw Error(`repo is undefined or empty string`);
};

export const BlogGitlabDirOverview = makeBlogDirOverview(getTitle);
