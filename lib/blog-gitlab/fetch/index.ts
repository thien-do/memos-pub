import { BlogResponse } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";
import { fetchBlogGitlabDir } from "./dir";
import { parseBlogGitlabError } from "./error";
import { fetchBlogGitlabFile } from "./file";

export const fetchBlogGitlab = async (
	request: BlogGitlabRequest
): Promise<BlogResponse> => {
	try {
		if (request.type === "tree") {
			return await fetchBlogGitlabDir(request);
		} else {
			return await fetchBlogGitlabFile(request);
		}
	} catch (error) {
		return parseBlogGitlabError({ request, error });
	}
};
