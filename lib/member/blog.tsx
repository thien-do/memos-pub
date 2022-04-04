import { BlogPage } from "@/lib/blog";
import { BlogResponse } from "@/lib/blog/type";
import { join as pathJoin } from "path";
import { GetBlogBreadcrumbItems } from "../blog/breadcrumb";
import { BlogBreadcrumbItem } from "../blog/breadcrumb/item";
import { GetBlogDirEntryHref } from "../blog/dir/entry";
import { GetBlogDirTitle } from "../blog/dir/overview";
import { getGitHubBlogFavicon } from "../github/blog";
import { MemberBlogRequest as Request } from "./type";

interface Props {
	request: Request;
	response: BlogResponse;
}

const getDirTitle: GetBlogDirTitle<Request> = (props) => {
	const { host, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use host
	return host;
};

const getDirEntryHref: GetBlogDirEntryHref<Request> = (props) => {
	const { entry, request } = props;
	const href = `/${pathJoin(request.path, entry.name)}`;
	return href;
};

const getBreadcrumbItems: GetBlogBreadcrumbItems<Request> = (props) => {
	const { path, owner, host } = props;

	const items: BlogBreadcrumbItem[] = [];

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

export const MemberBlogPage = (props: Props): JSX.Element => (
	<BlogPage<Request>
		request={props.request}
		response={props.response}
		getBreadcrumbItems={getBreadcrumbItems}
		getDirEntryHref={getDirEntryHref}
		getDirTitle={getDirTitle}
		getFavicon={getGitHubBlogFavicon}
	/>
);
