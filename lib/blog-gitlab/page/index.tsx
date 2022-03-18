import { makeBlogPage } from "@/lib/blog/page";
import { BlogResponse } from "@/lib/blog/type";
import { BlogGitlabDir } from "../dir";
import { BlogGitlabRequest } from "../type";

export interface BlogGitlabPageProps {
	request: BlogGitlabRequest;
	response: BlogResponse;
}

export const BlogGitlabPage = makeBlogPage<BlogGitlabRequest>({
	BlogDir: BlogGitlabDir,
});
