export type BlogConfigDate =
	| "yyyy-mm-dd " // e.g. https://github.com/MQuy/MQuy/tree/master/notes
	| "mm.dd.yyyy - "; // e.g. https://github.com/huytd/everyday/tree/main/notes

export interface BlogConfig {
	/**
	 * Memos.pub uses this format to search for a date in file names. If found,
	 * the dates will be used to improve list rendering such as sort by date
	 * and date column.
	 *
	 * Examples:
	 * - https://mquy.dev/notes
	 * - https://blog.keva.dev/
	 */
	dateFormat?: BlogConfigDate;
}
