import Head from "next/head";
import * as type from "../type";

interface Props<R> {
	getTitle: (props: { dir: type.BlogDir; request: R }) => string;
	dir: type.BlogDir;
	request: R;
}

export const BlogDirOverview = <R,>(props: Props<R>): JSX.Element => {
	const { dir, getTitle, request } = props;
	const title = getTitle({ dir, request });
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
		</div>
	);
};
