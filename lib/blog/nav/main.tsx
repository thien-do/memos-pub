import { BlogRequest } from "../request/type";
import { Fragment } from "react";
import { BlogNavItem, BlogNavItemLink } from "./item";

interface Props {
	request: BlogRequest;
}

export const BlogNavMain = (props: Props): JSX.Element => (
	<div className="flex items-center">
		{getItems(props).map((item) => (
			<Fragment key={item.href}>
				<BlogNavItemLink item={item} />
				<Separator />
			</Fragment>
		))}
	</div>
);

const Separator = (): JSX.Element => (
	<span className="px-2 text-gray-300 dark:text-gray-600">/</span>
);

const getItems = (props: Props): BlogNavItem[] => {
	const { path, repo, owner, domain } = props.request;

	const items: BlogNavItem[] = [];

	// Home
	items.push({
		image: `https://github.com/${owner}.png?size=64`,
		href: domain ? "/" : `/${repo}`,
		children: domain ?? repo,
	});

	// All others
	let href = domain ? "" : `/${repo}`;
	if (path !== "") {
		path.split("/").forEach((name) => {
			href = `${href}/${name}`;
			items.push({ href, children: name, image: null });
		});
	}

	// Last item is already shown as the page's title
	if (items.length > 1) {
		items.pop();
	}

	return items;
};
