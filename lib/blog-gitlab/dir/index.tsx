import { makeBlogDir } from "@/lib/blog/dir";
import { BlogGitlabDirBody } from "./body";
import { BlogGitlabDirOverview } from "./overview";

export const BlogGitlabDir = makeBlogDir({
	BlogDirBody: BlogGitlabDirBody,
	BlogDirOverview: BlogGitlabDirOverview,
});
