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
	return props.dir.filter(isFileValid).map(fromFile(props));
};

const isFileValid = (entry: GitHubDirEntry): boolean => {
	const { name, type } = entry;

	if (name.startsWith(".")) return false;
	if (name.startsWith("_")) return false;

	switch (type) {
		case "dir":
			return true;
		case "file":
			if (name.endsWith(".md")) return true;
			if (name.endsWith(".mdx")) return true;
			return false;
		default:
			return false;
	}
};

const fromFile =
	(props: Props) =>
	(raw: GitHubDirEntry): BlogEntry => {
		const { name } = raw;
		const type = typeMap[raw.type];
		if (type === undefined) throw Error(`Unknown type "${raw.type}"`);
		const format = props.config?.dateFormat ?? "yyyy-mm-dd ";
		const { date, rest } = parseBlogEntryDate({ format, name });
		let title = date === null ? name : rest;
		title = title.replace(".md", "");
		const entry: BlogEntry = { date, name, title, type };
		return entry;
	};

const typeMap: Record<string, BlogEntry["type"] | undefined> = {
	dir: "list",
	file: "post",
};
