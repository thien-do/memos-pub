import Head from "next/head";
import { BlogBreadcrumb, BlogBreadcrumbConfig } from "../breadcrumb";
import { BlogList, BlogListConfig } from "../list";
import { BlogPost } from "../post";
import { BlogContent as Content, BlogContentError } from "./type";

interface Config<R> {
	list: BlogListConfig<R>;
	breadcrumb: BlogBreadcrumbConfig<R>;
	getFavicon: (request: R) => string;
	Error: (props: { error: BlogContentError }) => JSX.Element;
}

interface Props<R> {
	request: R;
	content: Content;
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

export const BlogContent = <R,>(props: Props<R>): JSX.Element => (
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
