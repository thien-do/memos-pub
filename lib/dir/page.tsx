import { ContentDir, ContentDirFile } from "../content/type";
import { parseGitHubPath, stringifyGitHubPath } from "../github/path";

interface Props {
	content: ContentDir;
	segments: string[];
}

const getHref = (segments: string[], file: ContentDirFile): string => {
	const path = parseGitHubPath(segments);
	path.path = `${path.path}/${file.name}`;
	path.type = "blob";
	const nextSegments = stringifyGitHubPath(path);
	return `/${nextSegments.join("/")}`;
};

export const DirPage = (props: Props): JSX.Element => (
	<ul>
		{props.content.files.map((file) => (
			<li key={file.name}>
				<a target="_self" href={getHref(props.segments, file)}>
					({file.type}) {file.name}
				</a>
			</li>
		))}
	</ul>
);
