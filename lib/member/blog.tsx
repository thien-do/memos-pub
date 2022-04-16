import { join as pathJoin } from "path";
import { ErrorBase } from "../app/error/base";
import { getGitHubBlogFavicon } from "../github/blog";
import { MemberRequest } from "./type";
import { BlogContent } from "../blog/content/type";
import { BlogContentPage, BlogPageConfig } from "../blog/content/page";
import { BlogBreadcrumbItem } from "../blog/breadcrumb/type";

interface Props {
	request: MemberRequest;
	content: BlogContent;
}

export const MemberBlogPage = (props: Props): JSX.Element => (
	<BlogContentPage<MemberRequest>
		request={props.request}
		content={props.content}
		config={{ Error, breadcrumb, getFavicon, list }}
	/>
);

type Config = BlogPageConfig<MemberRequest>;

const getFavicon: Config["getFavicon"] = getGitHubBlogFavicon;

const list: Config["list"] = {
	getEntryHref: (props) => {
		const { entry, request } = props;
		const href = `/${pathJoin(request.path, entry.name)}`;
		return href;
	},
	getTitle: (props) => {
		const { host, path } = props.request;
		// Use current dir name from path first
		const dir = path.split("/").pop();
		if (dir !== "" && dir !== undefined) return dir;
		// Else (path is empty -> at repo root) we use host
		return host;
	},
};

const breadcrumb: Config["breadcrumb"] = {
	getItems: (props) => {
		const { path, owner, host } = props;

		const items: BlogBreadcrumbItem[] = [];

		// Host
		const image = `https://github.com/${owner}.png?size=64`;
		items.push({ image, href: "/", children: host });

		let href = "";
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
	},
};

const Error: Config["Error"] = (props) => (
	<ErrorBase title={props.error.status.toString()}>
		{/* Avoid exposing source path */}
		{props.error.status === 404
			? "It means this page could not be found."
			: props.error.message}
	</ErrorBase>
);
