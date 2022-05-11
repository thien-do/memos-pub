import { BlogContentMain } from "../content/main";
import { BlogPageProps } from "./type";

export const BlogPageMain = (props: BlogPageProps): JSX.Element => (
	<BlogContentMain content={props.content} request={props.request} />
);
