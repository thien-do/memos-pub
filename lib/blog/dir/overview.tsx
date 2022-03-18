import Head from "next/head";
import * as type from "../type";

interface BaseProps<R> {
	dir: type.BlogDir;
	request: R;
}

type GetTitle<R> = (props: BaseProps<R>) => string;
export type BlogDirOverviewGetTitle<R> = GetTitle<R>;

const getTitle: GetTitle<type.BlogRequest> = (props): string => {
	const { repo, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use repo
	return repo;
};

type Component<R> = (props: BaseProps<R>) => JSX.Element;
export type BlogDirOverviewComponent<R> = Component<R>;

export const makeBlogDirOverview = <R,>(getTitle: GetTitle<R>) => {
	const BlogDirOverview: Component<R> = (props) => {
		const title = getTitle(props);
		return (
			<div>
				<Head>
					<title>{title}</title>
				</Head>
				<h1>{title}</h1>
			</div>
		);
	};
	return BlogDirOverview;
};

export const BlogDirOverview = makeBlogDirOverview(getTitle);
