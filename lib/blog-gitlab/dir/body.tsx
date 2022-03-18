import { makeBlogDirBody } from "@/lib/blog/dir/body";
import { BlogGitlabRequest } from "../type";
import { BlogGitlabDirEntry } from "./entry";

export const BlogGitlabDirBody =
	makeBlogDirBody<BlogGitlabRequest>(BlogGitlabDirEntry);
