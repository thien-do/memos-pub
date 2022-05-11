import Head from "next/head";
import { BlogListMain } from "../list/main";
import { BlogNavMain } from "../nav/main";
import { BlogPostMain } from "../post/main";
import { BlogRequest } from "../request/type";
import { BlogContent } from "./type";

interface Props {
	request: BlogRequest;
	content: BlogContent;
}
export const BlogContentMain = (props: Props): JSX.Element => (
	<div>
		<Head>
			<link rel="icon" href={getFavicon(props)} type="image/png" />
		</Head>
		<BlogNavMain request={props.request} />
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);

const getFavicon = (props: Props): string => {
	const { owner } = props.request;
	return `https://funcs.dev/api/favicon?user=${owner}&size=48`;
};

const Body = (props: Props): JSX.Element => {
	const { request, content } = props;
	switch (content.type) {
		case "post":
			return <BlogPostMain post={content} />;
		case "list":
			return <BlogListMain list={content} request={request} />;
	}
};
