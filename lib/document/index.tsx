// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from "next/document";

// We prefer CustomApp over CustomDocument, but need to set the background
// color on body so that it works in scroll overflow (mac)

export const CustomDocument = (): JSX.Element => (
	<Html>
		<Head />
		<body className="bg-gray-100 dark:bg-gray-800">
			<Main />
			<NextScript />
		</body>
	</Html>
);
