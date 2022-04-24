import { Html, Head, Main, NextScript } from "next/document";

// In general, we prefer custom app over custom document. Custom document should
// only be used for things that custom app can't (e.g. background color on body)

const AppDocument = (): JSX.Element => (
	<Html lang="en-US">
		<Head>
			<script
				async
				defer
				data-website-id="f20c04c5-42b6-4803-b440-c0c4a1990de9"
				src="https://umami-production-d14b.up.railway.app/umami.js"
			></script>
		</Head>
		<body className="bg-gray-100 dark:bg-gray-800">
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default AppDocument;
