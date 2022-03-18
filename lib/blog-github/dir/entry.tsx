import { BlogDirEntry, BlogDirEntryProps } from "@/lib/blog/dir/entry";
import { BlogGitHubRequest } from "../type";

type Props = BlogDirEntryProps<BlogGitHubRequest>;

const getHref = (props: Props): string => {
	const { entry, request } = props;
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = request;
	const href = [repo, path, entry.name]
		.filter((part) => part !== "") // avoid double slash
		.join("/");
	return href;
};

export const BlogGitHubDirEntry = (props: Props): JSX.Element => (
	<BlogDirEntry
		entry={props.entry}
		request={props.request}
		getHref={getHref}
	/>
);
