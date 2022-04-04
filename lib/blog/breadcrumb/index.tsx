import { Fragment } from "react";
import { BlogBreadcrumbItem, BlogBreadcrumbItemLink } from "./item";

const Separator = (): JSX.Element => (
	<span className="px-2 text-gray-300 dark:text-gray-600">/</span>
);

export type GetBlogBreadcrumbItems<R> = (request: R) => BlogBreadcrumbItem[];

interface Props<R> {
	request: R;
	getItems: GetBlogBreadcrumbItems<R>;
}

export const BlogBreadcrumb = <R,>(props: Props<R>): JSX.Element => (
	<div className="flex items-center">
		{props.getItems(props.request).map((item) => (
			<Fragment key={item.href}>
				<BlogBreadcrumbItemLink item={item} />
				<Separator />
			</Fragment>
		))}
	</div>
);
