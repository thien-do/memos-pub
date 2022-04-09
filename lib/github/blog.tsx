import { BlogPage, GetBlogFavicon } from "@/lib/blog";
import { BlogResponse } from "@/lib/blog/type";
import { join as pathJoin } from "path";
import { GetBlogBreadcrumbItems } from "../blog/breadcrumb";
import { BlogBreadcrumbItem } from "../blog/breadcrumb/item";
import { GetBlogDirEntryHref } from "../blog/dir/entry";
import { GetBlogDirTitle } from "../blog/dir/overview";
import { GitHubBlogRequest as Request } from "./type";

interface Props {
	request: Request;
	response: BlogResponse;
}

const getFavicon: GetBlogFavicon<Request> = (request): string => {
	return `https://funcs.dev/api/favicon?user=${request.owner}&size=48`;
};

export { getFavicon as getGitHubBlogFavicon };

const getDirTitle: GetBlogDirTitle<Request> = (props) => {
	const { repo, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use repo
	return repo;
};

const getDirEntryHref: GetBlogDirEntryHref<Request> = (props) => {
	const { entry, request } = props;
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = request;
	// trick to avoid %20 (space) in URL
	const name = entry.name.split(" ").join("–");
	const href = `/${pathJoin(repo, path, name)}`;
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

export const GitHubBlogPage = (props: Props): JSX.Element => (
	<BlogPage<Request>
		request={props.request}
		response={props.response}
		getBreadcrumbItems={getBreadcrumbItems}
		getDirEntryHref={getDirEntryHref}
		getDirTitle={getDirTitle}
		getFavicon={getFavicon}
	/>
);
