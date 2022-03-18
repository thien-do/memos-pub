import Link from "next/link";
import * as type from "../type";

export interface BlogDirEntryProps<R> {
	entry: type.BlogDirEntry;
	request: R;
}

interface Props<R> extends BlogDirEntryProps<R> {
	getHref: (props: BlogDirEntryProps<R>) => string;
}

export const BlogDirEntry = <R,>(props: Props<R>): JSX.Element => {
	const isDir = props.entry.type === "dir";
	return (
		<li className={isDir ? "list-[disclosure-closed]" : ""}>
			<Link href={props.getHref(props)}>
				<a target="_self" className="font-normal no-underline">
					{props.entry.name}
				</a>
			</Link>
		</li>
	);
};
