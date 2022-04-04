import { BlogError } from "@/lib/blog/type";
import { BlogGitLabRequest } from "../type";

interface Props {
	request: BlogGitLabRequest;
	error: unknown;
}

export const parseBlogGitLabError = (props: Props): BlogError => {
	const { error, request } = props;
	// @TODO
	throw error;
};
