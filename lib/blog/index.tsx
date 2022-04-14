import Head from "next/head";
import { BlogBreadcrumb, GetBlogBreadcrumbItems } from "./breadcrumb";
import { BlogDir } from "./dir";
import { GetBlogDirEntryHref } from "./dir/entry";
import { GetBlogDirTitle } from "./dir/overview";
import { BlogFile } from "./file";
import * as type from "./type";

export type GetBlogFavicon<R> = (request: R) => string;
export type BlogError = (props: { error: type.BlogError }) => JSX.Element;

interface Props<R> {
	request: R;
	response: type.BlogResponse;
	getFavicon: GetBlogFavicon<R>;
	getBreadcrumbItems: GetBlogBreadcrumbItems<R>;
	getDirTitle: GetBlogDirTitle<R>;
	getDirEntryHref: GetBlogDirEntryHref<R>;
	BlogError: BlogError;
}

const Body = <R,>(props: Props<R>): JSX.Element => {
	const { request, response, BlogError } = props;
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
			return <BlogError error={response} />;
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
