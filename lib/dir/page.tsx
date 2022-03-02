import { ContentRequest, ContentDir, ContentDirEntry } from "../content/type";

interface Props {
	content: ContentDir;
	request: ContentRequest;
}

export const DirPage = (props: Props): JSX.Element => (
	<div className="container mx-auto px-4 sm:px-6 lg:px-8">
		<ul>
			{props.content.entries.map((entry) => (
				<li key={entry.name}></li>
			))}
		</ul>
	</div>
);
