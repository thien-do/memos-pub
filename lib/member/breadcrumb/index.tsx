import { BlogBreadcrumb, BlogBreadcrumbProps } from "@/lib/blog/breadcrumb";
import { BlogBreadcrumbItemProps } from "@/lib/blog/breadcrumb/item";
import { MemberBlogRequest } from "../type";

type Props = BlogBreadcrumbProps<MemberBlogRequest>;

const getItems = (request: MemberBlogRequest): BlogBreadcrumbItemProps[] => {
	const { path, owner, host } = request;

	const items: BlogBreadcrumbItemProps[] = [];

	// Host
	const image = `https://github.com/${owner}.png?size=64`;
	items.push({ image, href: "/", children: host });

	let href = "";
	if (path !== "") {
		path.split("/").forEach((name) => {
			href = `${href}/${name}`;
			items.push({ href, children: name });
		});
	}

	// Last item is already shown as the page's title
	if (items.length > 1) {
		items.pop();
	}

	return items;
};

export const MemberBlogBreadcrumb = (props: Props): JSX.Element => (
	<BlogBreadcrumb getItems={getItems} request={props.request} />
);
