import { BlogDirBody, BlogDirBodyProps } from "@/lib/blog/dir/body";
import { BlogDirEntryDisplay } from "@/lib/blog/type";
import { BlogGitLabRequest } from "../type";
import { BlogGitLabDirEntry } from "./entry";

type Props = BlogDirBodyProps<BlogGitLabRequest>;

const toEntry = (params: { props: Props; entry: BlogDirEntryDisplay }) => (
	<BlogGitLabDirEntry
		entry={params.entry}
		request={params.props.request}
		key={params.entry.name}
	/>
);

export const BlogGitLabDirBody = (props: Props): JSX.Element => (
	<BlogDirBody dir={props.dir} request={props.request} toEntry={toEntry} />
);
