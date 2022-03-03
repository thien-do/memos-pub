import { ContentFile } from "../content/type";
import { runMdx } from "../mdx/run";

interface Props {
	content: ContentFile;
}

export const FilePage = (props: Props): JSX.Element => {
	const { code } = props.content;
	const { Content, title, date } = runMdx(code);
	return (
		<div className="bg-gray-100 dark:bg-gray-800 pt-24 pb-32">
			<div
				className={[
					"prose dark:prose-invert",
					"mx-auto px-4 sm:px-6 lg:px-8",
					"prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl",
				].join(" ")}
			>
				{date && <p>{date}</p>}
				{title && <h1>{title}</h1>}
				<Content />
			</div>
		</div>
	);
};
