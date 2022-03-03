import { ContentFile } from "../content/type";
import { runMdx } from "../mdx/run";

interface Props {
	content: ContentFile;
}

export const FilePage = (props: Props): JSX.Element => {
	const { code } = props.content;
	const { Content, title, date } = runMdx(code);
	return (
		<div>
			{date && <p>{date}</p>}
			{title && <h1>{title}</h1>}
			<Content />
		</div>
	);
};
