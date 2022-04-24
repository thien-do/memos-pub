import { BlogEntryDateFormat } from "../entry/date";

export interface BlogListConfig {
	/**
	 * Control the display of the dir's README file (if exist):
	 * - "show": Display the README below the entry list
	 * - "hide": Don't display the README
	 * - "only": Display only the README, hide the dir's name and entry list.
	 *
	 * Default is "show"
	 */
	readme?: "show" | "only" | "hide";
	/**
	 * Recognize the date in an entry's name to improve entry list (e.g.
	 * sorting and date column)
	 */
	dateFormat?: BlogEntryDateFormat;
}
