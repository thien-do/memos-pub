import Head from "next/head";
import { BlogBreadcrumb, BlogBreadcrumbConfig } from "../breadcrumb/breadcrumb";
import { BlogList, BlogListConfig } from "../list/list";
import { BlogPost } from "../post";
import { BlogContent, BlogContentError } from "./type";

interface Config<R> {
	breadcrumb: BlogBreadcrumbConfig<R>;
	Error: (props: { error: BlogContentError }) => JSX.Element;
	getFavicon: (request: R) => string;
	list: BlogListConfig<R>;
}

interface Props<R> {
	request: R;
	content: BlogContent;
	config: Config<R>;
}

const Body = <R,>(props: Props<R>): JSX.Element => {
	const { request, content, config } = props;
	switch (content.type) {
		case "post":
			return <BlogPost post={content} />;
		case "list":
			return (
				<BlogList
					list={content}
					request={request}
					config={config.list}
				/>
			);
		case "error":
			return <config.Error error={content} />;
	}
};

export const BlogContentPage = <R,>(props: Props<R>): JSX.Element => (
	<div>
		<Head>
			<link
				rel="icon"
				href={props.config.getFavicon(props.request)}
				type="image/png"
			/>
		</Head>
		<BlogBreadcrumb
			request={props.request}
			config={props.config.breadcrumb}
		/>
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);
