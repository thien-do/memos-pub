import { BlogRequest } from "../request/type";
import { BlogPostMain } from "../post/main";
import { BlogListBody } from "./body";
import { BlogListTitle } from "./title";
import { BlogList } from "./type";
import { BlogConfig } from "../config/type";

interface Props {
	list: BlogList;
	request: BlogRequest;
	config: BlogConfig | null;
}

export const BlogListMain = (props: Props): JSX.Element => (
	<div>
		<Readme {...props} />
		{props.list.readme === null ? (
			<BlogListTitle list={props.list} request={props.request} />
		) : null}
		<Body {...props} />
	</div>
);

const Readme = (props: Props): JSX.Element | null => {
	const post = props.list.readme;
	const config = props.config?.readme ?? "show";
	if (config === "hide") return null;
	if (post === null) return null;
	return (
		<div className="mb-16">
			<BlogPostMain post={post} />
		</div>
	);
};

const Body = (props: Props): JSX.Element | null => {
	const readme = props.list.readme;
	const config = props.config?.readme ?? "show";

	if (config === "only" && readme !== null) return null;

	// Exclude README from file list if necessary
	let entries = props.list.entries;
	if (config === "show")
		entries = entries.filter(
			(entry) => entry.name !== "README.md" && !entry.name.startsWith("_")
		);
	const list = { ...props.list, entries };

	return <BlogListBody list={list} request={props.request} />;
};
