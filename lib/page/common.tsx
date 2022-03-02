import { ContentCommon, ContentRequest } from "../content/type";
import { PageDir } from "./dir";
import { PageFile } from "./file";

interface Props {
	content: ContentCommon;
	request: ContentRequest;
}

export const PageCommon = (props: Props): JSX.Element => {
	switch (props.content.type) {
		case "file":
			return <PageFile content={props.content} />;
		case "dir":
			return <PageDir request={props.request} content={props.content} />;
	}
};
