import { Html, Head, Main, NextScript } from "next/document";

// In general, we prefer custom app over custom document. Custom document should
// only be used for things that custom app can't (e.g. background color on body)

const AppDocument = (): JSX.Element => (
	<Html lang="en-US">
		<Head>
			<script
				defer
				data-domain="memos.pub"
				src="https://plausible.io/js/plausible.js"
			></script>
		</Head>
		<body className="bg-gray-100 dark:bg-gray-800">
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default AppDocument;
