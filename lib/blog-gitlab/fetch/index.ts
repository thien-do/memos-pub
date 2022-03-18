import { BlogResponse } from "@/lib/blog/type";
import { BlogGitLabRequest } from "../type";
import { fetchBlogGitLabDir } from "./dir";
import { parseBlogGitLabError } from "./error";
import { fetchBlogGitLabFile } from "./file";

export const fetchBlogGitLab = async (
	request: BlogGitLabRequest
): Promise<BlogResponse> => {
	try {
		if (request.type === "tree") {
			return await fetchBlogGitLabDir(request);
		} else {
			return await fetchBlogGitLabFile(request);
		}
	} catch (error) {
		return parseBlogGitLabError({ request, error });
	}
};
