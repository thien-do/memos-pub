import { Fragment } from "react";
import { BlogFile } from "../file";
import * as type from "../type";

export interface BlogDirProps<R> {
	dir: type.BlogDir;
	request: R;
}

// If dir has only 1 file and that file is README (or index) then we can skip
// the dir title and entry list
const shouldSkip = (props: BlogDirProps<unknown>): boolean => {
	const { entries, readme } = props.dir;
	return entries.length === 1 && readme !== null;
};

interface Props<R> extends BlogDirProps<R> {
	getOverview: (props: BlogDirProps<R>) => JSX.Element;
	getBody: (props: BlogDirProps<R>) => JSX.Element;
}

export const BlogDir = <R,>(props: Props<R>): JSX.Element => (
	<div>
		{shouldSkip(props) ? null : (
			<Fragment>
				{props.getOverview(props)}
				{props.getBody(props)}
			</Fragment>
		)}
		{props.dir.readme === null ? null : (
			<div className="mt-16">
				<BlogFile file={props.dir.readme} />
			</div>
		)}
	</div>
);
