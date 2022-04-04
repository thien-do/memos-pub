import * as type from "../type";
import { BlogDirEntry, GetBlogDirEntryHref } from "./entry";
import { toBlogDirEntryDisplay } from "./entry/display";

type Entry = type.BlogDirEntryDisplay;

const byName = (a: Entry, b: Entry): number => {
	return a.name.localeCompare(b.name);
};

const byDate = (a: Entry, b: Entry): number => {
	if (a.date === null || b.date === null) return byName(a, b);
	return b.date.getTime() - a.date.getTime();
};

const byType = (a: Entry, b: Entry): number => {
	if (a.type === b.type) return byDate(a, b);
	if (a.type === "dir") return -1;
	return 1;
};

interface Props<R> {
	dir: type.BlogDir;
	request: R;
	getEntryHref: GetBlogDirEntryHref<R>;
}

export const BlogDirBody = <R,>(props: Props<R>): JSX.Element => {
	const entries = props.dir.entries.map(toBlogDirEntryDisplay);
	return entries.length === 0 ? (
		<p className="text-gray-300 dark:text-gray-600">This folder is empty</p>
	) : (
		<ul>
			{entries.sort(byType).map((entry) => (
				<BlogDirEntry
					key={entry.name}
					entry={entry}
					getHref={props.getEntryHref}
					request={props.request}
				/>
			))}
		</ul>
	);
};
