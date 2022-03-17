import { BlogError } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

interface Props {
	request: BlogGitlabRequest;
	error: unknown;
}

export const parseBlogGitlabError = (props: Props): BlogError => {
	const { error, request } = props;
	// @TODO
	throw error;
};
