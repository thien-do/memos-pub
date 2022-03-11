import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const AppLayout = (props: Props): JSX.Element => (
	<div
		className={[
			"prose dark:prose-invert",
			// Layout
			"mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32",
			// Typography
			"prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl",
			"tabular-nums break-words",
		].join(" ")}
	>
		{props.children}
	</div>
);
