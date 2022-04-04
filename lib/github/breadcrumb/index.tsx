import { BlogBreadcrumb, BlogBreadcrumbProps } from "@/lib/blog/breadcrumb";
import { BlogBreadcrumbItemProps } from "@/lib/blog/breadcrumb/item";
import { BlogGitHubRequest } from "../type";

type Props = BlogBreadcrumbProps<BlogGitHubRequest>;

/**
 * [
 *   "/"
 *   "/notes",
 *   "/notes/july",
 *   "/notes/july/hello-world",
 * ]
 */
const getItems = (request: BlogGitHubRequest): BlogBreadcrumbItemProps[] => {
	const { path, repo, owner } = request;

	const items: BlogBreadcrumbItemProps[] = [];

	// Owner
	const image = `https://github.com/${owner}.png?size=64`;
	items.push({ image, href: "/", children: owner });

	// Repo
	let href = `/${repo}`;
	items.push({ href, children: repo });

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

export const BlogGitHubBreadcrumb = (props: Props): JSX.Element => (
	<BlogBreadcrumb getItems={getItems} request={props.request} />
);
