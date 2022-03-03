import { ContentDir } from "../content/components/dir";
import { ContentFile } from "../content/components/file";
import { ContentCommon, ContentRequest } from "../content/type";
import { TenantBreadcrumb } from "./breadcrumb";

interface Props {
	request: ContentRequest;
	content: ContentCommon;
}

const Body = (props: Props): JSX.Element => {
	switch (props.content.type) {
		case "file":
			return <ContentFile content={props.content} />;
		case "dir":
			return (
				<ContentDir request={props.request} content={props.content} />
			);
	}
};

export const TenantPage = (props: Props): JSX.Element => (
	<div
		className={[
			"bg-gray-100 dark:bg-gray-800 pb-32",
			"tabular-nums min-h-screen",
		].join(" ")}
	>
		<div
			className={[
				"prose dark:prose-invert",
				"mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32",
				"prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl",
			].join(" ")}
		>
			<TenantBreadcrumb request={props.request} />
			<div className="mt-16">
				<Body {...props} />
			</div>
		</div>
	</div>
);
