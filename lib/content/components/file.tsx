import { runMdx } from "@/lib/mdx/run";
import * as type from "../type";
import Head from "next/head";

interface Props {
	content: type.ContentFile;
}

export const ContentFile = (props: Props): JSX.Element => {
	const { code } = props.content;
	const { Content, title } = runMdx(code);
	return (
		<div>
			{title && <h1>{title}</h1>}
			<Content
				components={{
					// https://github.com/mdx-js/mdx/discussions/1921
					head: Head as any,
				}}
			/>
		</div>
	);
};
