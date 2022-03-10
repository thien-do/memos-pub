import { ContentDir } from "../content/components/dir";
import { ContentFile } from "../content/components/file";
import { ContentCommon, ContentRequest } from "../content/type";
import { TenantBreadcrumb } from "./breadcrumb";
import { TenantFavicon } from "./favicon";

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
	<div>
		<TenantFavicon request={props.request} />
		<TenantBreadcrumb request={props.request} />
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);
