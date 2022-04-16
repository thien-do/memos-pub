import { Fragment } from "react";
import { BlogBreadcrumbItem } from "./item";
import { BlogBreadcrumbItem as Item } from "./type";

type GetItems<R> = (request: R) => Item[];

export interface BlogBreadcrumbConfig<R> {
	getItems: GetItems<R>;
}

interface Props<R> {
	request: R;
	config: BlogBreadcrumbConfig<R>;
}

export const BlogBreadcrumb = <R,>(props: Props<R>): JSX.Element => (
	<div className="flex items-center">
		{props.config.getItems(props.request).map((item) => (
			<Fragment key={item.href}>
				<BlogBreadcrumbItem item={item} />
				<Separator />
			</Fragment>
		))}
	</div>
);

const Separator = (): JSX.Element => (
	<span className="px-2 text-gray-300 dark:text-gray-600">/</span>
);
