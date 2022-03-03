import { run } from "@mdx-js/mdx";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime.js";
import { ContentFile } from "../content/type";

interface Props {
	content: ContentFile;
}

export const FilePage = (props: Props): JSX.Element => {
	const { code } = props.content;

	const [mdxModule, setMdxModule] = useState<any>();
	const Content = mdxModule ? mdxModule.default : Fragment;

	useEffect(() => {
		(async () => {
			setMdxModule(await run(code, runtime));
		})();
	}, [code]);

	return (
		<div className="bg-gray-100 dark:bg-gray-800 pt-24 pb-32">
			<div
				className={[
					"prose dark:prose-invert",
					"mx-auto px-4 sm:px-6 lg:px-8",
					"prose-base md:prose-lg lg:prose-xl xl:prose-2xl",
				].join(" ")}
			>
				<Content />
			</div>
		</div>
	);
};
