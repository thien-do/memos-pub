import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

export const AppMain = ({ Component, pageProps }: AppProps): JSX.Element => (
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
			"prose-a:decoration-gray-400 prose-a:underline-offset-2",
			// Layout
			"mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32",
		].join(" ")}
	>
		<Component {...pageProps} />
	</div>
);
