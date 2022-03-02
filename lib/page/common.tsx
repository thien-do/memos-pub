import { ContentCommon, ContentRequest } from "../content/type";
import { DirPage } from "../dir/page";
import { FilePage } from "../file/page";

interface Props {
	content: ContentCommon;
	request: ContentRequest;
}

export const PageCommon = (props: Props): JSX.Element => {
	switch (props.content.type) {
		case "file":
			return <FilePage content={props.content} />;
		case "dir":
			return <DirPage request={props.request} content={props.content} />;
	}
};
