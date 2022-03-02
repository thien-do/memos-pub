import { ContentRequest, ContentDir, ContentDirEntry } from "../content/type";

interface Props {
	content: ContentDir;
	request: ContentRequest;
}

const getHref = (props: Props, entry: ContentDirEntry): string => {
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = props.request;
	return `/${repo}/${path}/${entry.name}`;
};

export const PageDir = (props: Props): JSX.Element => (
	<ul>
		{props.content.entries.map((entry) => (
			<li key={entry.name}>
				<a target="_self" href={getHref(props, entry)}>
					({entry.type}) {entry.name}
				</a>
			</li>
		))}
	</ul>
);
