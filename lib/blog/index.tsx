import Head from "next/head";
import { ErrorBase } from "../error/base";
import { BlogBreadcrumb, GetBlogBreadcrumbItems } from "./breadcrumb";
import { BlogDir } from "./dir";
import { GetBlogDirEntryHref } from "./dir/entry";
import { GetBlogDirTitle } from "./dir/overview";
import { BlogFile } from "./file";
import { BlogResponse } from "./type";

export type GetBlogFavicon<R> = (request: R) => string;

interface Props<R> {
	request: R;
	response: BlogResponse;
	getFavicon: GetBlogFavicon<R>;
	getBreadcrumbItems: GetBlogBreadcrumbItems<R>;
	getDirTitle: GetBlogDirTitle<R>;
	getDirEntryHref: GetBlogDirEntryHref<R>;
}

const Body = <R,>(props: Props<R>): JSX.Element => {
	const { request, response } = props;
	switch (response.type) {
		case "file":
			return <BlogFile file={response} />;
		case "dir":
			return (
				<BlogDir
					dir={response}
					request={request}
					getEntryHref={props.getDirEntryHref}
					getTitle={props.getDirTitle}
				/>
			);
		case "error":
			return (
				<ErrorBase title={response.status.toString()}>
					{response.message}
				</ErrorBase>
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
		<BlogBreadcrumb
			request={props.request}
			getItems={props.getBreadcrumbItems}
		/>
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);
