import { BlogDirEntryGetHref, makeBlogDirEntry } from "@/lib/blog/dir/entry";
import { BlogGitlabRequest } from "../type";

const getHref: BlogDirEntryGetHref<BlogGitlabRequest> = (props): string => {
	const { entry, request } = props;
	const { path, project, ref, type } = request;
	let href = `/${project}/-/${type}/${ref}/${path}/${entry.name}`;
	// "path" may be empty ("") result in double slash
	href = href.replaceAll("//", "/");
	return href;
};

export const BlogGitlabDirEntry = makeBlogDirEntry<BlogGitlabRequest>(getHref);
