import { BlogDirBody, BlogDirBodyProps } from "@/lib/blog/dir/body";
import { BlogDirEntryDisplay } from "@/lib/blog/type";
import { BlogGitHubRequest } from "../type";
import { BlogGitHubDirEntry } from "./entry";

type Props = BlogDirBodyProps<BlogGitHubRequest>;

const toEntry = (props: Props, entry: BlogDirEntryDisplay) => (
	<BlogGitHubDirEntry
		entry={entry}
		request={props.request}
		key={entry.name}
	/>
);

export const BlogGitHubDirBody = (props: Props): JSX.Element => (
	<BlogDirBody dir={props.dir} request={props.request} toEntry={toEntry} />
);
