import * as type from "../type";
import Link from "next/link";

interface BaseProps<R> {
	entry: type.BlogDirEntry;
	request: R;
}

type GetHref<R> = (getHref: BaseProps<R>) => string;
export type BlogDirEntryGetHref<R> = GetHref<R>;

const getHref: GetHref<type.BlogRequest> = (props): string => {
	const { entry, request } = props;
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = request;
	let href = `/${repo}/${path}/${entry.name}`;
	// "path" may be empty ("") result in double slash
	href = href.replaceAll("//", "/");
	return href;
};

type Component<R> = (props: BaseProps<R>) => JSX.Element;
export type BlogDirEntryComponent<R> = Component<R>;

export const makeBlogDirEntry = <R,>(getHref: GetHref<R>) => {
	const BlogDirEntry: Component<R> = (props) => {
		const isDir = props.entry.type === "dir";
		return (
			<li className={isDir ? "list-[disclosure-closed]" : ""}>
				<Link href={getHref(props)}>
					<a target="_self" className="font-normal no-underline">
						{props.entry.name}
					</a>
				</Link>
			</li>
		);
	};
	return BlogDirEntry;
};

export const BlogDirEntry = makeBlogDirEntry<type.BlogRequest>(getHref);
