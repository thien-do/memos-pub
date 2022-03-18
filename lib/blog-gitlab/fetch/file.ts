import { BlogFile } from "@/lib/blog/type";
import { compileMdx } from "@/lib/mdx/compile";
import { resolveBlogGitLabMdxUrl } from "../mdx/url";
import { BlogGitLabRequest } from "../type";

interface Response {
	content: string;
}

// https://gitlab.com/api/v4/projects/gitlab-org%2Fgitlab/repository/files/README.md?ref=master
const fetchContent = async (request: BlogGitLabRequest): Promise<string> => {
	const url = [
		"https://gitlab.com/api/v4/projects",
		`/${encodeURIComponent(request.project)}`,
		"/repository/files",
		`/${encodeURIComponent(request.path)}`,
		`?ref=${request.ref}`,
	]
		.join("")
		.replaceAll("//", "/"); // path could be ""
	const raw = await fetch(url);
	const response = (await raw.json()) as Response;
	const content = Buffer.from(response.content, "base64").toString();
	return content;
};

export const fetchBlogGitLabFile = async (
	request: BlogGitLabRequest
): Promise<BlogFile> => {
	const content = await fetchContent(request);
	const resolveUrl = resolveBlogGitLabMdxUrl;
	const options = { request, resolveUrl };
	const code = await compileMdx({ content, options });
	const file: BlogFile = { type: "file", code };
	return file;
};
