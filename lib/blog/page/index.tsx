import { AppErrorBase } from "@/lib/app/error/base";
import { BlogDir, BlogDirComponent } from "../dir";
import { BlogFile } from "../file";
import { BlogRequest, BlogResponse } from "../type";
import { BlogBreadcrumb } from "./breadcrumb";
import { BlogFavicon } from "./favicon";

interface BaseProps<R> {
	request: R;
	response: BlogResponse;
}
export type BlogPageBaseProps<R> = BaseProps<R>;

export type BlogPageProps = BaseProps<BlogRequest>;

type Component<R> = (props: BaseProps<R>) => JSX.Element;
export type BlogPageComponent<R> = Component<R>;

interface MakeProps<R> {
	BlogDir: BlogDirComponent<R>;
}

export const makeBlogPage = <R,>(props: MakeProps<R>) => {
	const { BlogDir } = props;
	const BlogPage: Component<R> = (props) => {
		const { request, response } = props;
		return (
			<div>
				{/* <BlogFavicon request={request} />
				<BlogBreadcrumb request={request} /> */}
				<div className="mt-16">
					{response.type === "file" ? (
						<BlogFile file={response} />
					) : response.type === "dir" ? (
						<BlogDir request={request} dir={response} />
					) : (
						<AppErrorBase title={response.status.toString()}>
							{response.message}
						</AppErrorBase>
					)}
				</div>
			</div>
		);
	};
	return BlogPage;
};

export const BlogPage = makeBlogPage<BlogRequest>({ BlogDir });
