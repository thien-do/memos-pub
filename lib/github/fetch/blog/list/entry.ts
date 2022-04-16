import { parseBlogEntryDate } from "@/lib/blog/entry/date";
import { BlogEntry } from "@/lib/blog/entry/type";
import { BlogListConfig } from "@/lib/blog/list/config";
import { BlogList } from "@/lib/blog/list/type";
import { GitHubDir, GitHubDirEntry } from "../../type";

interface Props {
	config: BlogListConfig | null;
	dir: GitHubDir;
}

export const getGitHubBlogEntries = (props: Props): BlogList["entries"] => {
	return props.dir.filter(isValid).map(toEntry(props));
};

const isValid = (entry: GitHubDirEntry): boolean => {
	const { name, type } = entry;

	if (name.startsWith(".")) return false;
	if (name.startsWith("_")) return false;

	switch (type) {
		case "dir":
			return true;
		case "file":
			if (name.endsWith(".md")) return true;
			if (name.endsWith(".markdown")) return true;
			if (name.endsWith(".mdx")) return true;
			return false;
		default:
			return false;
	}
};

const toEntry =
	(props: Props) =>
	(raw: GitHubDirEntry): BlogEntry => {
		const { name, type } = raw;
		if (!ensureType(type)) throw Error("");
		const format = props.config?.dateFormat ?? "yyyy-mm-dd ";
		const { date, rest } = parseBlogEntryDate({ format, name });
		const title = date === null ? name : rest;
		const entry: BlogEntry = { date, name, title, type };
		return entry;
	};

const ensureType = (type: string): type is BlogEntry["type"] => {
	return ["file", "dir"].includes(type);
};
