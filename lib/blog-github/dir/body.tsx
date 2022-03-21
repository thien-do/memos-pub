import { BlogDirBody, BlogDirBodyProps } from "@/lib/blog/dir/body";
import { BlogDirEntryDisplay } from "@/lib/blog/type";
import { BlogGitHubRequest } from "../type";
import { BlogGitHubDirEntry } from "./entry";

type Props = BlogDirBodyProps<BlogGitHubRequest>;

const toEntry = (params: { props: Props; entry: BlogDirEntryDisplay }) => (
	<BlogGitHubDirEntry
		entry={params.entry}
		request={params.props.request}
		key={params.entry.name}
	/>
);

export const BlogGitHubDirBody = (props: Props): JSX.Element => (
	<BlogDirBody dir={props.dir} request={props.request} toEntry={toEntry} />
);
