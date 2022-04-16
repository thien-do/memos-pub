import { BlogError, BlogPage, GetBlogFavicon } from "@/lib/blog";
import { join as pathJoin } from "path";
import { BlogBreadcrumbItem } from "../blog/breadcrumb/item";
import { GetBlogListTitle } from "../blog/list/title";
import { ErrorBase } from "../error/base";
import { GitHubRequest as Request } from "./type";

interface Props {
	request: Request;
	response: BlogResponse;
}

const getFavicon: GetBlogFavicon<Request> = (request): string => {
	return `https://funcs.dev/api/favicon?user=${request.owner}&size=48`;
};

export { getFavicon as getGitHubBlogFavicon };

const getDirTitle: GetBlogListTitle<Request> = (props) => {
	const { repo, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use repo
	return repo;
};

const getDirEntryHref: GetBlogListEntryHref<Request> = (props) => {
	const { entry, request } = props;
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = request;
	const href = `/${pathJoin(repo, path, entry.name)}`;
	return href;
};

const getBreadcrumbItems: GetBlogBreadcrumbItems<Request> = (request) => {
	const { path, repo, owner } = request;

	const items: BlogBreadcrumbItem[] = [];

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

const BlogError: BlogError = (props) => (
	<ErrorBase title={props.error.status.toString()}>
		{props.error.message}
	</ErrorBase>
);

export const GitHubBlogPage = (props: Props): JSX.Element => (
	<BlogPage<Request>
		request={props.request}
		response={props.response}
		getBreadcrumbItems={getBreadcrumbItems}
		getDirEntryHref={getDirEntryHref}
		getDirTitle={getDirTitle}
		getFavicon={getFavicon}
		BlogError={BlogError}
	/>
);
