import { BlogDirEntry, BlogDirEntryFile } from "../type";

/** Case in-sensitive */
const README_FILES = ["readme.md", "readme.mdx", "index.md", "index.mdx"];

const isReadme = (entry: BlogDirEntry): boolean => {
	const found = README_FILES.some((candidate) => {
		return entry.name.toLowerCase() === candidate;
	});
	return found;
};

export const findBlogDirReadme = (
	entries: BlogDirEntry[]
): BlogDirEntryFile | null => {
	const found = entries.find(isReadme);
	if (found === undefined) return null;
	if (found.type === "dir") throw Error("Found README file is not file");
	return found;
};
