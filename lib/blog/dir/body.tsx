import * as type from "../type";

export interface BlogDirBodyProps<R> {
	dir: type.BlogDir;
	request: R;
}

const byType = (a: type.BlogDirEntry, b: type.BlogDirEntry): number => {
	if (a.type === b.type) return 0;
	if (a.type === "dir") return -1;
	return 1;
};

const sortEntries = (props: BlogDirBodyProps<unknown>): type.BlogDirEntry[] => {
	return props.dir.entries.slice().reverse().sort(byType);
};

interface Props<R> extends BlogDirBodyProps<R> {
	toEntry: (
		props: BlogDirBodyProps<R>,
		entry: type.BlogDirEntry
	) => JSX.Element;
}

export const BlogDirBody = <R,>(props: Props<R>): JSX.Element => {
	const entries = sortEntries(props);
	return entries.length === 0 ? (
		<p className="text-gray-400 dark:text-gray-600">This folder is empty</p>
	) : (
		<ul>
			{sortEntries(props).map((entry) => {
				return props.toEntry(props, entry);
			})}
		</ul>
	);
};
