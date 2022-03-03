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

export const DirEntry = (props: Props): JSX.Element => (
	<a
		target="_self"
		href={getHref(props)}
		className="font-normal no-underline"
	>
		{props.entry.name}
		{props.entry.type === "dir" ? "/" : ""}
	</a>
);
