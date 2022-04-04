import { Fragment } from "react";
import { BlogFile } from "../file";
import * as type from "../type";
import { BlogDirBody } from "./body";
import { BlogDirOverview } from "./overview";

interface Props<R> {
	dir: type.BlogDir;
	request: R;
	getTitle: Parameters<typeof BlogDirOverview>[0]["getTitle"];
	getEntryHref: Parameters<typeof BlogDirBody>[0]["getEntryHref"];
}

// If dir has only 1 file and that file is README (or index) then we can skip
// the dir title and entry list
const shouldSkip = (props: Props<unknown>): boolean => {
	const { entries, readme } = props.dir;
	return entries.length === 1 && readme !== null;
};

export const BlogDir = <R,>(props: Props<R>): JSX.Element => (
	<div>
		{shouldSkip(props) ? null : (
			<Fragment>
				<BlogDirOverview
					dir={props.dir}
					getTitle={props.getTitle}
					request={props.request}
				/>
				<BlogDirBody
					dir={props.dir}
					getEntryHref={props.getEntryHref}
					request={props.request}
				/>
			</Fragment>
		)}
		{props.dir.readme === null ? null : (
			<div className="mt-16">
				<BlogFile file={props.dir.readme} />
			</div>
		)}
	</div>
);
