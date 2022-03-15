// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from "next/document";

// In general, we prefer custom app over custom document. Custom document should
// only be used for things that custom app can't (e.g. background color on body)

export const AppDocument = (): JSX.Element => (
	<Html>
		<Head />
		<body className="bg-gray-100 dark:bg-gray-800">
			<Main />
			<NextScript />
		</body>
	</Html>
);
