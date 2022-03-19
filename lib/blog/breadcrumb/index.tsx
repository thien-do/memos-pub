import { Fragment } from "react";
import { BlogBreadcrumbItem, BlogBreadcrumbItemProps } from "./item";

export interface BlogBreadcrumbProps<R> {
	request: R;
}

export type BlogBreadcrumbGetItems<R> = (
	request: R
) => BlogBreadcrumbItemProps[];

const Separator = (): JSX.Element => (
	<span className="px-2 text-gray-400 dark:text-gray-600">/</span>
);

interface Props<R> extends BlogBreadcrumbProps<R> {
	getItems: BlogBreadcrumbGetItems<R>;
}

export const BlogBreadcrumb = <R,>(props: Props<R>): JSX.Element => (
	<div className="flex items-center">
		{props.getItems(props.request).map((item) => (
			<Fragment key={item.href}>
				<BlogBreadcrumbItem {...item} />
				<Separator />
			</Fragment>
		))}
	</div>
);
