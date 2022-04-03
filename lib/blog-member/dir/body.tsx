import { BlogDirBody, BlogDirBodyProps } from "@/lib/blog/dir/body";
import { BlogDirEntryDisplay } from "@/lib/blog/type";
import { MemberBlogRequest } from "../type";
import { MemberBlogDirEntry } from "./entry";

type Props = BlogDirBodyProps<MemberBlogRequest>;

const toEntry = (params: { props: Props; entry: BlogDirEntryDisplay }) => (
	<MemberBlogDirEntry
		entry={params.entry}
		request={params.props.request}
		key={params.entry.name}
	/>
);

export const MemberBlogDirBody = (props: Props): JSX.Element => (
	<BlogDirBody dir={props.dir} request={props.request} toEntry={toEntry} />
);
