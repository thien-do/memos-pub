import { BlogFile } from "@/lib/blog/type";
import { compileMdx } from "@/lib/mdx/compile";
import { GetMdxCompileOptionsProps } from "@/lib/mdx/compile/options";
import { resolveBlogGitlabMdxUrl } from "../mdx/url";
import { BlogGitlabRequest } from "../type";

interface Response {
	content: string;
}

// https://gitlab.com/api/v4/projects/gitlab-org%2Fgitlab/repository/files/README.md?ref=master
const fetchContent = async (request: BlogGitlabRequest): Promise<string> => {
	const url = [
		"https://gitlab.com/api/v4/projects/",
		`${encodeURIComponent(request.project)}/`,
		"repository/files/",
		`${encodeURIComponent(request.path)}/`,
		`?ref=${request.ref}`,
	].join("/");
	const raw = await fetch(url);
	const response = (await raw.json()) as Response;
	const content = Buffer.from(response.content, "base64").toString();
	return content;
};

export const fetchBlogGitlabFile = async (
	request: BlogGitlabRequest
): Promise<BlogFile> => {
	const content = await fetchContent(request);
	const resolveUrl = resolveBlogGitlabMdxUrl;
	const options = { request, resolveUrl };
	const code = await compileMdx({ content, options });
	const file: BlogFile = { type: "file", code };
	return file;
};
