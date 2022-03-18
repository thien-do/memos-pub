import { BlogDir } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

export const fetchBlogGitlabDir = async (
	request: BlogGitlabRequest
): Promise<BlogDir> => {
	// @TODO
	const dir: BlogDir = { entries: [], readme: null, type: "dir" };
	return dir;
};
