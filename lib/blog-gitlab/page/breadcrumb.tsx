import Link from "next/link";
import { BlogGitLabRequest } from "../type";

interface Props {
	request: BlogGitLabRequest;
}

/**
 * [
 *   "/notes",
 *   "/notes/july",
 *   "/notes/july/hello-world",
 * ]
 */
const getItems = (props: Props): string[] => {
	return [];
	/*
	const { path, repo } = props.request;
	let last = `/${repo}`;
	const items: string[] = [last];
	path.split("/")
		// Avoid duplicate repo path ("/")
		.filter((path) => path !== "")
		.forEach((part) => {
			last = `${last}/${part}`;
			items.push(last);
		});
	items.pop();
	return items;
	*/
};

const renderItem = (href: string): JSX.Element => (
	<span key={href}>
		<span className="px-2 text-gray-400">/</span>
		<Link href={href}>
			<a className="font-normal no-underline">{href.split("/").pop()}</a>
		</Link>
	</span>
);

const Owner = (props: Props): JSX.Element => (
	<Link href="/">
		<a
			className={[
				"font-normal no-underline not-prose",
				"flex items-center",
			].join(" ")}
		>
			<img
				src="https://gitlab.com/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png?width=64"
				alt=""
				width="32"
				height="32"
				className="rounded-full"
			/>
			<span className="ml-3">{props.request.project}</span>
		</a>
	</Link>
);

export const BlogGitLabBreadcrumb = (props: Props): JSX.Element => (
	<div className="flex items-center">
		<Owner {...props} />
		{getItems(props).map(renderItem)}
	</div>
);
