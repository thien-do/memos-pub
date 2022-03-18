import * as type from "../type";
import { BlogDirEntry, BlogDirEntryComponent } from "./entry";

interface BaseProps<R> {
	dir: type.BlogDir;
	request: R;
}

const byType = (a: type.BlogDirEntry, b: type.BlogDirEntry): number => {
	if (a.type === b.type) return 0;
	if (a.type === "dir") return -1;
	return 1;
};

const sortEntries = (props: BaseProps<unknown>): type.BlogDirEntry[] => {
	return props.dir.entries.slice().reverse().sort(byType);
};

type Component<R> = (props: BaseProps<R>) => JSX.Element;
export type BlogDirBodyComponent<R> = Component<R>;

export const makeBlogDirBody = <R,>(BlogDirEntry: BlogDirEntryComponent<R>) => {
	const BlogDirBody: Component<R> = (props) => {
		const entries = sortEntries(props);
		return entries.length === 0 ? (
			<p className="text-gray-400">This folder is empty</p>
		) : (
			<ul>
				{sortEntries(props).map((entry) => (
					<BlogDirEntry
						entry={entry}
						request={props.request}
						key={entry.name}
					/>
				))}
			</ul>
		);
	};
	return BlogDirBody;
};

export const BlogDirBody = makeBlogDirBody(BlogDirEntry);
