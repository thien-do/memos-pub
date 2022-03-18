import { BlogFile } from "@/lib/blog/file";
import { BlogResponse } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

export interface BlogGitlabPageProps {
	request: BlogGitlabRequest;
	response: BlogResponse;
}

export const BlogGitlabPage = (props: BlogGitlabPageProps): JSX.Element => {
	const { request, response } = props;
	switch (response.type) {
		case "file":
			return <BlogFile file={response} />;
		default:
			return <p>WIP for {response.type}</p>;
	}
};
