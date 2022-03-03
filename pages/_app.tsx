import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
	<div
		className={[
			"bg-gray-100 dark:bg-gray-800 pt-24 pb-32",
			"tabular-nums min-h-screen",
		].join(" ")}
	>
		<div
			className={[
				"prose dark:prose-invert",
				"mx-auto px-4 sm:px-6 lg:px-8",
				"prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl",
			].join(" ")}
		>
			<Component {...pageProps} />
		</div>
	</div>
);

export default MyApp;
