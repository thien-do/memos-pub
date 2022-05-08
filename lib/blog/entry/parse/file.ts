import { BlogConfig } from "@/lib/config/type";
import { GitHubEntry } from "@/lib/github/type";
import { BlogEntry } from "../type";
import { parseBlogEntryDate } from "./date";

export const isBlogEntryFile = (entry: GitHubEntry): boolean => {
	const { name, type } = entry;

	if (name.startsWith(".")) return false;
	if (name.startsWith("_")) return false;

	switch (type) {
		case "dir":
			return true;
		case "file":
			if (name.endsWith(".md")) return true;
			return false;
		default:
			return false;
	}
};

interface Props {
	config: BlogConfig | null;
}

const typeMap: Record<string, BlogEntry["type"] | undefined> = {
	dir: "list",
	file: "post",
};

export const parseBlogEntryFromFile =
	(props: Props) =>
	(raw: GitHubEntry): BlogEntry => {
		// Type
		const type = typeMap[raw.type];
		if (type === undefined) throw Error(`Unknown type "${raw.type}"`);

		// Name
		const { name } = raw;
		const format = props.config?.dateFormat ?? "yyyy-mm-dd ";
		const { date, rest } = parseBlogEntryDate({ format, name });
		let title = date === null ? name : rest;
		title = title.replace(".md", "");

		const entry: BlogEntry = { date, name, title, type };
		return entry;
	};
