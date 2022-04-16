import { join as pathJoin } from "path";
import { ErrorBase } from "../app/error/base";
import { GitHubRequest } from "./type";
import { BlogContent } from "../blog/content/type";
import { BlogContentPage, BlogPageConfig } from "../blog/content/page";
import { BlogBreadcrumbItem } from "../blog/breadcrumb/type";

interface Props {
	request: GitHubRequest;
	content: BlogContent;
}

export const GitHubBlog = (props: Props): JSX.Element => (
	<BlogContentPage<GitHubRequest>
		request={props.request}
		content={props.content}
		config={{ Error, breadcrumb, getFavicon, list }}
	/>
);

type Config = BlogPageConfig<GitHubRequest>;

const list: Config["list"] = {
	getEntryHref: (props) => {
		const { entry, request } = props;
		// don't need "user" here because we redirect inside subdomain
		const { repo, path } = request;
		const href = `/${pathJoin(repo, path, entry.name)}`;
		return href;
	},
	getTitle: (props) => {
		const { repo, path } = props.request;
		// Use current dir name from path first
		const dir = path.split("/").pop();
		if (dir !== "" && dir !== undefined) return dir;
		// Else (path is empty -> at repo root) we use repo
		return repo;
	},
};

const Error: Config["Error"] = (props) => (
	<ErrorBase title={props.error.status.toString()}>
		{props.error.message}
	</ErrorBase>
);

const getFavicon: Config["getFavicon"] = (request): string => {
	return `https://funcs.dev/api/favicon?user=${request.owner}&size=48`;
};

const breadcrumb: Config["breadcrumb"] = {
	getItems: (request) => {
		const { path, repo, owner } = request;

		const items: BlogBreadcrumbItem[] = [];

		// Owner
		const image = `https://github.com/${owner}.png?size=64`;
		items.push({ image, href: "/", children: owner });

		// Repo
		let href = `/${repo}`;
		items.push({ href, children: repo, image: null });

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

export { getFavicon as getGitHubBlogFavicon };
