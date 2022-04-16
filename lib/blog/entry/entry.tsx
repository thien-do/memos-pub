import Link from "next/link";
import { BlogEntry as Entry } from "./type";

type GetHref<R> = (props: { entry: Entry; request: R }) => string;

interface Props<R> {
	entry: Entry;
	request: R;
	getHref: GetHref<R>;
}

export const BlogEntry = <R,>(props: Props<R>): JSX.Element => {
	const { entry, getHref, request } = props;

	let date: string | null = null;
	if (entry.date !== null) {
		date = entry.date.toISOString();
		date = date.slice(0, date.indexOf("T"));
	}

	const link = (
		<a
			target="_self"
			className="flex items-baseline font-normal no-underline"
		>
			{date && (
				<span className="flex-0 mr-6 text-gray-500 dark:text-gray-400">
					{date}
				</span>
			)}
			<span className="flex-1 overflow-hidden">{entry.title}</span>
		</a>
	);

	return (
		<li className={entry.type === "list" ? "list-[disclosure-closed]" : ""}>
			<Link href={getHref({ entry, request })}>{link}</Link>
		</li>
	);
};

export type { GetHref as GetBlogEntryHref };
