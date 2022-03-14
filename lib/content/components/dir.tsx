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

export const ContentDir = (props: Props): JSX.Element => (
	<Fragment>
		<h1>{props.request.path.split("/").pop()}</h1>
		<ul>
			{sortEntries(props).map((entry) => (
				<ContentDirEntry
					entry={entry}
					request={props.request}
					key={entry.name}
				/>
			))}
		</ul>
		{props.content.readme && (
			<div className="mt-16">
				<ContentFile content={props.content.readme} />
			</div>
		)}
	</Fragment>
);
