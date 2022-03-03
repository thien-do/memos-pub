import { ContentDir, ContentDirEntry, ContentRequest } from "../content/type";
import { DirEntry } from "./entry";

interface Props {
	content: ContentDir;
	request: ContentRequest;
}

const byType = (a: ContentDirEntry, b: ContentDirEntry): number => {
	if (a.type === b.type) return 0;
	if (a.type === "dir") return -1;
	return 1;
};

export const DirPage = (props: Props): JSX.Element => (
	<ul>
		{props.content.entries
			.reverse()
			.sort(byType)
			.map((entry) => (
				<li key={entry.name}>
					<DirEntry entry={entry} request={props.request} />
				</li>
			))}
	</ul>
);
