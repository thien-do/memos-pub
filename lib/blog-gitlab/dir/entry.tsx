import { BlogDirEntry, BlogDirEntryProps } from "@/lib/blog/dir/entry";
import { BlogGitLabRequest } from "../type";
import * as type from "@/lib/blog/type";

type Props = BlogDirEntryProps<BlogGitLabRequest>;

const getType = (
	type: type.BlogDirEntry["type"]
): BlogGitLabRequest["type"] => {
	if (type === "dir") return "tree";
	if (type === "file") return "blob";
	throw Error(`Unknown type: "${type}"`);
};

const getHref = (props: Props): string => {
	const { path, project, ref } = props.request;
	const { name, type } = props.entry;
	const parts = [project, "-", getType(type), ref, path, name];
	const href = `/${parts.filter((p) => p !== "").join("/")}`;
	return href;
};

export const BlogGitLabDirEntry = (props: Props): JSX.Element => (
	<BlogDirEntry
		entry={props.entry}
		request={props.request}
		getHref={getHref}
	/>
);
