import { BlogFile } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

interface Props {
	request: BlogGitlabRequest;
}

export const fetchBlogGitlabFile = async (props: Props): Promise<BlogFile> => {
	const { request } = props;
	// @TODO
	const file: BlogFile = { type: "file", code: "" };
	return file;
};
