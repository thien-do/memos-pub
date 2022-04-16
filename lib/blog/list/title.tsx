import Head from "next/head";
import { BlogList } from "./type";

export type GetBlogListTitle<R> = (props: {
	list: BlogList;
	request: R;
}) => string;

interface Props<R> {
	getTitle: GetBlogListTitle<R>;
	list: BlogList;
	request: R;
}

export const BlogListTitle = <R,>(props: Props<R>): JSX.Element => {
	const { list, getTitle, request } = props;
	const title = getTitle({ list, request });
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
		</div>
	);
};
