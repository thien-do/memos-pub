import { ContentDirEntry, ContentRequest } from "../content/type";

interface Props {
	entry: ContentDirEntry;
	request: ContentRequest;
}

const getHref = (props: Props): string => {
	const { entry, request } = props;
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = request;
	return `/${repo}/${path}/${entry.name}`;
};

interface EntryDisplay extends ContentDirEntry {
	prefix: string | null;
}

export const DirEntry = (props: Props): JSX.Element => (
	<a target="_self" href={getHref(props)}>
		({props.entry.type}) {props.entry.name}
	</a>
);
