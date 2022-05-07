import { Fragment } from "react";
import { GetBlogEntryHref } from "../entry/entry";
import { BlogPost } from "../post";
import { BlogListBody } from "./body";
import { BlogListTitle, GetBlogListTitle } from "./title";
import * as type from "./type";

export interface BlogListConfig<R> {
	getTitle: GetBlogListTitle<R>;
	getEntryHref: GetBlogEntryHref<R>;
}

interface Props<R> {
	list: type.BlogList;
	request: R;
	config: BlogListConfig<R>;
}

export const BlogList = <R,>(props: Props<R>): JSX.Element => (
	<div>
		{props.list.readme !== null ? (
			<div className="mb-16">
				<BlogPost post={props.list.readme} />
			</div>
		) : null}
		{props.list.readme === null ? (
			<BlogListTitle
				list={props.list}
				getTitle={props.config.getTitle}
				request={props.request}
			/>
		) : null}
		<BlogListBody
			list={props.list}
			getEntryHref={props.config.getEntryHref}
			request={props.request}
		/>
	</div>
);
