import { AppErrorBase } from "@/lib/app/error/base";
import Head from "next/head";
import { BlogFile } from "../file";
import { BlogDir, BlogResponse } from "../type";
// import { BlogGitHubBreadcrumb } from "./breadcrumb";
// import { BlogGitHubFavicon } from "./favicon";

export interface BlogPageProps<R> {
	request: R;
	response: BlogResponse;
}

interface Props<R> extends BlogPageProps<R> {
	getDir: (request: R, dir: BlogDir) => JSX.Element;
	getFavicon: (request: R) => string;
	getBreadcrumb: (request: R) => JSX.Element;
}

const Body = <R,>(props: Props<R>): JSX.Element => {
	const { getDir, request, response } = props;
	switch (response.type) {
		case "file":
			return <BlogFile file={response} />;
		case "dir":
			return getDir(request, response);
		case "error":
			return (
				<AppErrorBase title={response.status.toString()}>
					{response.message}
				</AppErrorBase>
			);
	}
};

export const BlogPage = <R,>(props: Props<R>): JSX.Element => (
	<div>
		<Head>
			<link
				rel="icon"
				href={props.getFavicon(props.request)}
				type="image/png"
			/>
		</Head>
		{props.getBreadcrumb(props.request)}
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);
