import { BlogContentMain } from "../content/main";
import { BlogPageProps } from "./type";

export const BlogPageMain = (props: BlogPageProps): JSX.Element => {
	const { config, content, request } = props;
	return <BlogContentMain {...{ config, content, request }} />;
};
