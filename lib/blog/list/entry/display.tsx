import { BlogListEntry, BlogListEntryDisplay } from "../type";

// Only support ISO format by default. Other formats will be supported via
// config file in the future.
const dateRegExp = (() => {
	// Separator between date and title, " " or " - "
	const sep = " (?:- )?";
	const ext = ".(?:md|mdx|markdown)$";
	// yyyymmdd title
	const date = `\\d{4}-\\d{2}-\\d{2}`;
	const pattern = `^(${date})${sep}(.+)${ext}`;
	const exp = new RegExp(pattern);
	return exp;
})();

interface Name {
	title: string;
	date: null | Date;
}

/**
 * Extract date in entry name. Not all entries have date
 * - https://github.com/thien-do/memos-pub/issues/19
 */
const parseName = (name: string): Name => {
	const result: Name = { title: name, date: null };
	if (result.date !== null) return result;
	const matches = name.match(dateRegExp);
	if (matches === null) return result;
	const dateString = `${matches[1]}T00:00:00Z`; // Ensure UTC timezone
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return result;
	result.date = date;
	result.title = matches[2];
	return result;
};

export const toBlogListEntryDisplay = (
	entry: BlogListEntry
): BlogListEntryDisplay => ({
	...entry,
	...parseName(entry.name),
});
