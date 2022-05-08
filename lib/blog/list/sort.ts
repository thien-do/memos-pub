import { BlogEntry } from "../entry/type";

const byTitle = (a: BlogEntry, b: BlogEntry): number => {
	return a.title.localeCompare(b.title);
};

const byDate = (a: BlogEntry, b: BlogEntry): number => {
	if (a.date === null || b.date === null) return byTitle(a, b);
	return b.date.localeCompare(a.date);
};

const byType = (a: BlogEntry, b: BlogEntry): number => {
	if (a.type === b.type) return byDate(a, b);
	if (a.type === "list") return -1;
	return 1;
};

export const compareBlogEntries = (a: BlogEntry, b: BlogEntry): number => {
	return byType(a, b);
};
