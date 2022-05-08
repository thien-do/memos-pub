import { BlogRequest } from "../request/type";
import Head from "next/head";
import { BlogList } from "./type";

interface Props {
	list: BlogList;
	request: BlogRequest;
}

export const BlogListTitle = (props: Props): JSX.Element => {
	const { list, request } = props;
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

const getTitle = (props: Props): string => {
	const { domain, path, repo } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty) we are at home
	return domain ?? repo;
};
