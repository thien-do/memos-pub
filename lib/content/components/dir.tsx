import Head from "next/head";
import * as type from "../type";
import { ContentDirEntry } from "./dir-entry";
import { ContentFile } from "./file";

interface Props {
	content: type.ContentDir;
	request: type.ContentRequest;
}

const byType = (a: type.ContentDirEntry, b: type.ContentDirEntry): number => {
	if (a.type === b.type) return 0;
	if (a.type === "dir") return -1;
	return 1;
};

const sortEntries = (props: Props): type.ContentDirEntry[] => {
	return props.content.entries.slice().reverse().sort(byType);
};

const getTitle = (props: Props): string => {
	const { repo, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use repo
	return repo;
};

const Main = (props: Props): JSX.Element | null => {
	const { entries, readme } = props.content;

	// If dir has only 1 file and that file is README (or index) then we can skip
	// the dir title and entry list
	if (entries.length === 1 && readme !== null) return null;

	const title = getTitle(props);

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
			<ul>
				{sortEntries(props).map((entry) => (
					<ContentDirEntry
						entry={entry}
						request={props.request}
						key={entry.name}
					/>
				))}
			</ul>
		</div>
	);
};

const Readme = (props: Props): JSX.Element | null => {
	const { readme } = props.content;
	if (readme === null) return null;
	return (
		<div className="mt-16">
			<ContentFile content={readme} />
		</div>
	);
};

export const ContentDir = (props: Props): JSX.Element => (
	<div>
		<Main {...props} />
		<Readme {...props} />
	</div>
);
