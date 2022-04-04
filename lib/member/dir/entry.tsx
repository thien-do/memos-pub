import { BlogDirEntry, BlogDirEntryProps } from "@/lib/blog/dir/entry";
import nodepath from "path";
import { MemberBlogRequest } from "../type";

type Props = BlogDirEntryProps<MemberBlogRequest>;

const getHref = (props: Props): string => {
	const { entry, request } = props;
	const href = `/${nodepath.join(request.path, entry.name)}`;
	return href;
};

export const MemberBlogDirEntry = (props: Props): JSX.Element => (
	<BlogDirEntry
		entry={props.entry}
		request={props.request}
		getHref={getHref}
	/>
);
