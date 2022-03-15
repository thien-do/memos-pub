import { BlogDir } from "../dir";
import { BlogFile } from "../file/file";
import { BlogRequest, BlogResponse } from "../type";
import { BlogBreadcrumb } from "./breadcrumb";
import { BlogFavicon } from "./favicon";

export interface BlogPageProps {
	request: BlogRequest;
	response: BlogResponse;
}

const Body = (props: BlogPageProps): JSX.Element => {
	const { request, response } = props;
	switch (response.type) {
		case "file":
			return <BlogFile file={response} />;
		case "dir":
			return <BlogDir request={request} dir={response} />;
	}
};

export const BlogPage = (props: BlogPageProps): JSX.Element => (
	<div>
		<BlogFavicon request={props.request} />
		<BlogBreadcrumb request={props.request} />
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);
