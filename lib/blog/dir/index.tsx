import { Fragment } from "react";
import { BlogFile } from "../file";
import * as type from "../type";
import { BlogDirBody, BlogDirBodyComponent } from "./body";
import { BlogDirOverview, BlogDirOverviewComponent } from "./overview";

interface BaseProps<R> {
	dir: type.BlogDir;
	request: R;
}

// If dir has only 1 file and that file is README (or index) then we can skip
// the dir title and entry list
const shouldSkip = (props: BaseProps<unknown>): boolean => {
	const { entries, readme } = props.dir;
	return entries.length === 1 && readme !== null;
};

type Component<R> = (props: BaseProps<R>) => JSX.Element;
export type BlogDirComponent<R> = Component<R>;

interface MakeProps<R> {
	BlogDirOverview: BlogDirOverviewComponent<R>;
	BlogDirBody: BlogDirBodyComponent<R>;
}

export const makeBlogDir = <R,>(props: MakeProps<R>) => {
	const { BlogDirBody, BlogDirOverview } = props;
	const BlogDir: BlogDirComponent<R> = (props): JSX.Element => (
		<div>
			{shouldSkip(props) ? null : (
				<Fragment>
					<BlogDirOverview {...props} />
					<BlogDirBody {...props} />
				</Fragment>
			)}
			{props.dir.readme === null ? null : (
				<div className="mt-16">
					<BlogFile file={props.dir.readme} />
				</div>
			)}
		</div>
	);
	return BlogDir;
};

export const BlogDir = makeBlogDir({ BlogDirBody, BlogDirOverview });
