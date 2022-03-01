import { DirPage } from "../dir/page";
import { FilePage } from "../file/page";
import { ContentCommon } from "./type";

interface Props {
	content: ContentCommon;
	segments: string[];
}

export const ContentPage = (props: Props): JSX.Element => {
	switch (props.content.type) {
		case "file":
			return <FilePage content={props.content} />;
		case "dir":
			return (
				<DirPage segments={props.segments} content={props.content} />
			);
	}
};
