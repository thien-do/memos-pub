import { Html, Head, Main, NextScript } from "next/document";

// In general, we prefer custom app over custom document. Custom document should
// only be used for things that custom app can't (e.g. background color on body)

const AppDocument = (): JSX.Element => (
	<Html lang="en-US">
		<Head>
			{/* https://nextjs.org/docs/basic-features/font-optimization#usage */}
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin=""
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
				rel="stylesheet"
			/>
		</Head>
		<body className="bg-gray-100 dark:bg-gray-800">
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default AppDocument;
