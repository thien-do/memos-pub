import { BlogEntry, GetBlogEntryHref } from "../entry/entry";
import { compareBlogEntries } from "../entry/sort";
import { BlogList } from "./type";

interface Props<R> {
	list: BlogList;
	request: R;
	getEntryHref: GetBlogEntryHref<R>;
}

export const BlogListBody = <R,>(props: Props<R>): JSX.Element => {
	const entries = props.list.entries
		.filter((entry) => entry.title !== "README.md")
		.sort(compareBlogEntries);
	return entries.length === 0 ? (
		<p className="text-gray-300 dark:text-gray-600">This folder is empty</p>
	) : (
		<ul>
			{entries.map((entry) => (
				<BlogEntry
					key={entry.name}
					entry={entry}
					getHref={props.getEntryHref}
					request={props.request}
				/>
			))}
		</ul>
	);
};
