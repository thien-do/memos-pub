import { BlogRequest } from "../request/type";
import { BlogPostMain } from "../post/main";
import { BlogListBody } from "./body";
import { BlogListTitle } from "./title";
import { BlogList } from "./type";

interface Props {
	list: BlogList;
	request: BlogRequest;
}

export const BlogListMain = (props: Props): JSX.Element => (
	<div>
		{props.list.readme !== null ? (
			<div className="mb-16">
				<BlogPostMain post={props.list.readme} />
			</div>
		) : null}
		{props.list.readme === null ? (
			<BlogListTitle list={props.list} request={props.request} />
		) : null}
		<BlogListBody list={props.list} request={props.request} />
	</div>
);
