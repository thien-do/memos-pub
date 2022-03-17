import { BlogDir } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

interface Props {
	request: BlogGitlabRequest;
}

export const fetchBlogGitlabDir = async (props: Props): Promise<BlogDir> => {
	const { request } = props;
	// @TODO
	const dir: BlogDir = { entries: [], readme: null, type: "dir" };
	return dir;
};
