import { Fragment } from "react";
import { ContentRequest } from "../content/type";
import Link from "next/link";

interface Props {
	request: ContentRequest;
}

/**
 * [
 *   "notes",
 *   "notes/july",
 *   "notes/july/hello-world",
 * ]
 */
const getItems = (props: Props): string[] => {
	const { path, repo } = props.request;
	let last = `/${repo}`;
	const items: string[] = [last];
	path.split("/").forEach((part) => {
		last = `${last}/${part}`;
		items.push(last);
	});
	items.pop();
	return items;
};

const renderItem = (href: string): JSX.Element => (
	<Fragment key={href}>
		{" / "}
		<Link href={href}>
			<a className="font-normal no-underline">{href.split("/").pop()}</a>
		</Link>
	</Fragment>
);

export const TenantBreadcrumb = (props: Props): JSX.Element => {
	const { owner } = props.request;
	return (
		<div className="flex items-center">
			<div className="not-prose">
				<img
					src={`https://github.com/${owner}.png?s=16`}
					alt=""
					width="32"
					height="32"
					className="rounded-full"
				/>
			</div>
			<div className="ml-3">
				<span>{owner}</span>
				{getItems(props).map(renderItem)}
			</div>
		</div>
	);
};
