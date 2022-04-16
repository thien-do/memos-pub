import { BlogListEntry } from "./entry/type";

/** Case in-sensitive */
const README_FILES = ["readme.md", "readme.mdx", "index.md", "index.mdx"];

const isReadme = (entry: BlogListEntry): boolean => {
	const found = README_FILES.some((candidate) => {
		return entry.name.toLowerCase() === candidate;
	});
	return found;
};

export const findBlogListReadme = (
	entries: BlogListEntry[]
): BlogListEntryFile | null => {
	const found = entries.find(isReadme);
	if (found === undefined) return null;
	if (found.type === "list")
		throw Error("A README is found but it is a directory");
	return found;
};
