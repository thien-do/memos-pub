import { BlogListEntry, GetBlogListEntryHref } from "./entry";
import { toBlogListEntryDisplay } from "./entry/display";
import { BlogList } from "./type";
import { BlogListEntry as Entry } from "./entry/type";

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
	list: BlogList;
	request: R;
	getEntryHref: GetBlogListEntryHref<R>;
}

export const BlogListBody = <R,>(props: Props<R>): JSX.Element => {
	const entries = props.list.entries.map(toBlogListEntryDisplay);
	return entries.length === 0 ? (
		<p className="text-gray-300 dark:text-gray-600">This folder is empty</p>
	) : (
		<ul>
			{entries.sort(byType).map((entry) => (
				<BlogListEntry
					key={entry.name}
					entry={entry}
					getHref={props.getEntryHref}
					request={props.request}
				/>
			))}
		</ul>
	);
};
