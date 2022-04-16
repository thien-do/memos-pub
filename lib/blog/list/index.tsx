import { Fragment } from "react";
import { BlogPost } from "../post";
import { BlogListBody } from "./body";
import { GetBlogListEntryHref } from "./entry";
import { BlogListTitle, GetBlogListTitle } from "./title";
import * as type from "./type";

export interface BlogListConfig<R> {
	getTitle: GetBlogListTitle<R>;
	getEntryHref: GetBlogListEntryHref<R>;
}

interface Props<R> {
	list: type.BlogList;
	request: R;
	config: BlogListConfig<R>;
}

// If list has only 1 file and that file is README (or index) then we can skip
// the dir title and entry list
const shouldSkip = (dir: type.BlogList): boolean => {
	const { entries, readme } = dir;
	return entries.length === 1 && readme !== null;
};

export const BlogList = <R,>(props: Props<R>): JSX.Element => (
	<div>
		{shouldSkip(props.list) ? null : (
			<Fragment>
				<BlogListTitle
					list={props.list}
					getTitle={props.config.getTitle}
					request={props.request}
				/>
				<BlogListBody
					list={props.list}
					getEntryHref={props.config.getEntryHref}
					request={props.request}
				/>
			</Fragment>
		)}
		{props.list.readme === null ? null : (
			<div className="mt-16">
				<BlogPost post={props.list.readme} />
			</div>
		)}
	</div>
);
