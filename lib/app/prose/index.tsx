import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const AppProse = (props: Props): JSX.Element => (
	<div
		className={[
			"prose dark:prose-invert",
			// Size
			"prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl",
			"tabular-nums break-words",
			// Headings
			"prose-headings:relative",
			"prose-headings:lg:leading-tight",
			"prose-headings:xl:leading-tight",
			"prose-headings:2xl:leading-tight",
			// Links
			"prose-a:decoration-gray-400 dark:prose-a:decoration-gray-500",
			"prose-a:underline-offset-2",
			// Inline code
			"prose-code:font-[350] prose-code:rounded-[0.25em]",
			"prose-code:bg-gray-200 dark:prose-code:bg-gray-900",
			"prose-code:before:content-none prose-code:after:content-none", // Remove backtick in inline-code
			// Block code
			"prose-pre:bg-gray-200 dark:prose-pre:bg-gray-900",
			// Layout
			"mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32",
		].join(" ")}
	>
		{props.children}
	</div>
);
