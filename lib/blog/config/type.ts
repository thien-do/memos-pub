export type BlogConfigDate =
	| "yyyy-mm-dd " // e.g. https://github.com/MQuy/MQuy/tree/master/notes
	| "mm.dd.yyyy - "; // e.g. https://github.com/huytd/everyday/tree/main/notes

export type BlogConfigReadonly =
	/**
	 * If a folder has a README, show the README content before the folder's
	 * file list. The README is not listed in the file list.
	 */
	| "show"
	/**
	 * Don't show the README content even if a folder has a README. The README
	 * is listed in the file list as a normal entry.
	 */
	| "hide"
	/**
	 * If a folder has a README, show the README content and hide the folder's
	 * file list. If a folder doesn't have a README, show the file list.
	 *
	 * This is useful to have a clean-URLs setup. You can name the files in
	 * URL-friendly format (e.g. "hello-world.md") and use the README to
	 * list them in human-friendly format (e.g. "Hello World").
	 *
	 * This is also useful in draft article. You can view in-progress articles
	 * via their URL but your readers won't see them listed yet.
	 */
	| "only";

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
	/**
	 * Whether to render a README content when a folder has one. This can be
	 * used to hide the folder's file list. See the type definition above for
	 * detail.
	 */
	readme?: BlogConfigReadonly;
}
