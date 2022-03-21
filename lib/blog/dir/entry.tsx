import Link from "next/link";
import * as type from "../type";

export interface BlogDirEntryProps<R> {
	entry: type.BlogDirEntryDisplay;
	request: R;
}

interface Props<R> extends BlogDirEntryProps<R> {
	getHref: (props: BlogDirEntryProps<R>) => string;
}

const DateFormatter = new Intl.DateTimeFormat("default", {
	year: "2-digit",
	month: "short",
	day: "2-digit",
});

export const BlogDirEntry = <R,>(props: Props<R>): JSX.Element => {
	const { type, date, title } = props.entry;
	const body = (
		<a
			target="_self"
			className={["flex items-start", "font-normal no-underline"].join(
				" "
			)}
		>
			{date !== null && (
				<span
					className={[
						"flex-0 mr-6",
						"text-gray-500 dark:text-gray-400",
					].join(" ")}
				>
					{DateFormatter.format(date)}
				</span>
			)}
			<span className="flex-1 overflow-hidden">{title}</span>
		</a>
	);
	return (
		<li className={type === "dir" ? "list-[disclosure-closed]" : ""}>
			<Link href={props.getHref(props)}>{body}</Link>
		</li>
	);
};
