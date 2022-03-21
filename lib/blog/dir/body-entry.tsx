import { BlogDirEntry, BlogDirEntryDisplay } from "../type";

// Separator between y m d, "-" or "/" or "."
const sd = "[-/.]";
// Separator between date and title, " " or " - "
const st = " (?:- )?";
const ext = ".(?:md|mdx|markdown)$";

const FORMATS: string[] = [
	`^(\\d{2}${sd}\\d{2}${sd}\\d{2})${st}(.+)${ext}`, // yymmdd title
	`^(\\d{4}${sd}\\d{2}${sd}\\d{2})${st}(.+)${ext}`, // yyyymmdd title
	`^(\\d{2}${sd}\\d{2}${sd}\\d{4})${st}(.+)${ext}`, // ddmmyyyy title
];

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
	FORMATS.forEach((format) => {
		if (result.date !== null) return;
		const regex = new RegExp(format);
		const matches = name.match(regex);
		if (matches === null) return;
		const date = new Date(matches[1]);
		if (Number.isNaN(date.getTime())) return;
		result.date = date;
		result.title = matches[2];
	});
	return result;
};

export const toBlogDirEntryDisplay = (
	entry: BlogDirEntry
): BlogDirEntryDisplay => ({
	...entry,
	...parseName(entry.name),
});
