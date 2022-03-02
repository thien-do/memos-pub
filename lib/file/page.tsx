import { ContentFile } from "../content/type";
import { fileToHTML } from "./html";

interface Props {
	content: ContentFile;
}

export const FilePage = (props: Props): JSX.Element => (
	<div
		className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto"
		dangerouslySetInnerHTML={{
			__html: fileToHTML(props.content.body),
		}}
	/>
);
