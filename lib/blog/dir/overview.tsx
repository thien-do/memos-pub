import Head from "next/head";
import * as type from "../type";

export interface BlogDirOverviewProps<R> {
	dir: type.BlogDir;
	request: R;
}

interface Props<R> extends BlogDirOverviewProps<R> {
	getTitle: (props: BlogDirOverviewProps<R>) => string;
}

export const BlogDirOverview = <R,>(props: Props<R>): JSX.Element => {
	const title = props.getTitle(props);
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
		</div>
	);
};
