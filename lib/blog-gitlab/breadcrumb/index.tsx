import { BlogBreadcrumb, BlogBreadcrumbProps } from "@/lib/blog/breadcrumb";
import { BlogBreadcrumbItemProps } from "@/lib/blog/breadcrumb/item";
import { BlogGitLabRequest } from "../type";

type Props = BlogBreadcrumbProps<BlogGitLabRequest>;

/**
 * [
 *   "/"
 *   "/notes",
 *   "/notes/july",
 *   "/notes/july/hello-world",
 * ]
 */
const getItems = (request: BlogGitLabRequest): BlogBreadcrumbItemProps[] => {
	const { path, project, ref } = request;

	const items: BlogBreadcrumbItemProps[] = [];

	// Project
	const image =
		"https://gitlab.com/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png?width=64";
	let href = `/${project}/-/tree/${ref}`;
	items.push({ image, href, children: project });

	// Path
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

export const BlogGitLabBreadcrumb = (props: Props): JSX.Element => (
	<BlogBreadcrumb getItems={getItems} request={props.request} />
);
