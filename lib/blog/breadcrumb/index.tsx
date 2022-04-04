import { Fragment } from "react";
import { BlogBreadcrumbItem } from "./item";

const Separator = (): JSX.Element => (
	<span className="px-2 text-gray-300 dark:text-gray-600">/</span>
);

interface Props<R> {
	request: R;
	getItems: (request: R) => Parameters<typeof BlogBreadcrumbItem>[0][];
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
