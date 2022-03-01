import { FilePage } from "../file/page";
import { ContentCommon } from "./type";

interface Props {
	content: ContentCommon;
}

export const ContentPage = (props: Props): JSX.Element => {
	switch (props.content.type) {
		case "file":
			return <FilePage content={props.content} />;
		case "dir":
			return <div>dir</div>;
	}
};
