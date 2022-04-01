import Link from "next/link";
import * as type from "../type";
import { toISOString } from "@/lib/blog/utils/date";

export interface BlogDirEntryProps<R> {
	entry: type.BlogDirEntryDisplay;
	request: R;
}

interface Props<R> extends BlogDirEntryProps<R> {
	getHref: (props: BlogDirEntryProps<R>) => string;
}

const Prefix = <R,>(props: Props<R>): JSX.Element | null => {
	const date = props.entry.date;
	if (date === null) return null;

	let text = toISOString(date);
	text = text.slice(0, text.indexOf("T"));
	return (
		<span className="flex-0 mr-6 text-gray-500 dark:text-gray-400">
			{text}
		</span>
	);
};

export const BlogDirEntry = <R,>(props: Props<R>): JSX.Element => (
	<li
		className={props.entry.type === "dir" ? "list-[disclosure-closed]" : ""}
	>
		<Link href={props.getHref(props)}>
			<a
				target="_self"
				className="flex items-baseline font-normal no-underline"
			>
				<Prefix {...props} />
				<span className="flex-1 overflow-hidden">
					{props.entry.title}
				</span>
			</a>
		</Link>
	</li>
);
