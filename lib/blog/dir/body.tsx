import * as type from "../type";
import { BlogDirEntry } from "./entry";

interface Props {
	dir: type.BlogDir;
	request: type.BlogRequest;
}

const byType = (a: type.BlogDirEntry, b: type.BlogDirEntry): number => {
	if (a.type === b.type) return 0;
	if (a.type === "dir") return -1;
	return 1;
};

const sortEntries = (props: Props): type.BlogDirEntry[] => {
	return props.dir.entries.slice().reverse().sort(byType);
};

export const BlogDirBody = (props: Props): JSX.Element => {
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
