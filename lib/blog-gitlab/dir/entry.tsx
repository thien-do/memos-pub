import { BlogDirEntryGetHref, makeBlogDirEntry } from "@/lib/blog/dir/entry";
import { BlogDirEntry } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

const getType = (type: BlogDirEntry["type"]): BlogGitlabRequest["type"] => {
	if (type === "dir") return "tree";
	if (type === "file") return "blob";
	throw Error(`Unknown type: "${type}"`);
};

const getHref: BlogDirEntryGetHref<BlogGitlabRequest> = (props): string => {
	const { path, project, ref } = props.request;
	const { name, type } = props.entry;
	const parts = [project, "-", getType(type), ref, path, name];
	const href = `/${parts.filter((p) => p !== "").join("/")}`;
	return href;
};

export const BlogGitlabDirEntry = makeBlogDirEntry<BlogGitlabRequest>(getHref);
