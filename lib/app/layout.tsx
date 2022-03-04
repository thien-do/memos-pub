import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const AppLayout = (props: Props): JSX.Element => (
	<div
		className={[
			"bg-gray-100 dark:bg-gray-800",
			"tabular-nums min-h-screen",
		].join(" ")}
	>
		<div
			className={[
				"prose dark:prose-invert",
				"mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32", // Layout
				"prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl", // Typography
			].join(" ")}
		>
			{props.children}
		</div>
	</div>
);
