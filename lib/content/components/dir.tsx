import { Fragment } from "react";
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

/**
 * If dir has only 1 file and that file is README (or index) then we can skip
 * the dir title and entry list
 */
const shouldSkipDir = (props: Props): boolean => {
	const { entries, readme } = props.content;
	return entries.length === 1 && readme !== null;
};

export const ContentDir = (props: Props): JSX.Element => (
	<Fragment>
		{shouldSkipDir(props) === false && (
			<Fragment>
				<h1>{getTitle(props)}</h1>
				<ul>
					{sortEntries(props).map((entry) => (
						<ContentDirEntry
							entry={entry}
							request={props.request}
							key={entry.name}
						/>
					))}
				</ul>
			</Fragment>
		)}
		{props.content.readme && (
			<div className="mt-16">
				<ContentFile content={props.content.readme} />
			</div>
		)}
	</Fragment>
);
