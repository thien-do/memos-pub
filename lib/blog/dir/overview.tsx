import Head from "next/head";
import * as type from "../type";

interface Props {
	dir: type.BlogDir;
	request: type.BlogRequest;
}

const getTitle = (props: Props): string => {
	const { repo, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use repo
	return repo;
};

export const BlogDirOverview = (props: Props): JSX.Element | null => {
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
