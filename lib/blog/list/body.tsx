import { BlogRequest } from "../request/type";
import { BlogEntryLink } from "../entry/link";
import { compareBlogEntries } from "./sort";
import { BlogList } from "./type";

interface Props {
	list: BlogList;
	request: BlogRequest;
}

export const BlogListBody = (props: Props): JSX.Element => {
	const entries = props.list.entries
		// README is already render at top of BlogList
		.filter((entry) => entry.name !== "README.md")
		.sort(compareBlogEntries);
	return entries.length === 0 ? (
		<p className="text-gray-300 dark:text-gray-600">This folder is empty</p>
	) : (
		<ul>
			{entries.map((entry) => (
				<BlogEntryLink
					key={entry.name}
					entry={entry}
					request={props.request}
				/>
			))}
		</ul>
	);
};
