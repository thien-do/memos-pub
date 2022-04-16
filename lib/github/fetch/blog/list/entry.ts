import { parseBlogEntryDate } from "@/lib/blog/entry/date";
import { BlogEntry } from "@/lib/blog/entry/type";
import { BlogListConfig, BlogListConfigEntry } from "@/lib/blog/list/config";
import { BlogList } from "@/lib/blog/list/type";
import { GitHubDir, GitHubDirEntry } from "../../type";

interface Props {
	config: BlogListConfig | null;
	dir: GitHubDir;
}

export const getGitHubBlogEntries = (props: Props): BlogList["entries"] => {
	if (props.config?.entries) {
		return props.config.entries.map(fromConfig(props));
	} else {
		return props.dir.filter(isFileValid).map(fromFile(props));
	}
};

const fromConfig =
	(props: Props) =>
	(raw: BlogListConfigEntry): BlogEntry => {
		const name = raw.name;
		const format = props.config?.dateFormat ?? "yyyy-mm-dd ";
		const { date, rest } = parseBlogEntryDate({ format, name });
		const title = date === null ? name : rest;
		return { date, name: raw.path, title, type: "post" };
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
			if (name.endsWith(".markdown")) return true;
			if (name.endsWith(".mdx")) return true;
			return false;
		default:
			return false;
	}
};

const fromFile =
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
