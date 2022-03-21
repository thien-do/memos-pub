import { BlogDirEntry, BlogDirEntryDisplay } from "../type";

// Between y m d, "-" or "/" or "."
const d = "[-/.]";
// Between date and title, " " or " - "
const t = " (?:- )?";

const FORMATS: string[] = [
	`^(\\d{2}${d}\\d{2}${d}\\d{2})${t}(.+)`, // yymmdd title
	`^(\\d{4}${d}\\d{2}${d}\\d{2})${t}(.+)`, // yyyymmdd title
	`^(\\d{2}${d}\\d{2}${d}\\d{4})${t}(.+)`, // ddmmyyyy title
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
