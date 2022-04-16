import { BlogDirEntry } from "../type";

const isNotNull = <Value>(value: Value | null): value is Value => {
	if (value === null) return false;
	// https://stackoverflow.com/a/46700791
	const _test: Value = value;
	return true;
};

const isValid = (entry: BlogDirEntry): boolean => {
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
	}
};

export const filterBlogDirEntries = (
	entries: (BlogDirEntry | null)[]
): BlogDirEntry[] => {
	return entries.filter(isNotNull).filter(isValid);
};
