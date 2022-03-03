import { runMdx } from "@/lib/mdx/run";
import * as type from "../type";

interface Props {
	content: type.ContentFile;
}

export const ContentFile = (props: Props): JSX.Element => {
	const { code } = props.content;
	const { Content, title, date } = runMdx(code);
	return (
		<div>
			{/* {date && <p>{date}</p>} */}
			{title && <h1>{title}</h1>}
			<Content />
		</div>
	);
};
