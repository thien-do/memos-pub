import Head from "next/head";
import { Fragment } from "react";
import { LayoutNone } from "../app/layout/layout";
import { HomeDetail } from "./detail";
import { HomeGallery } from "./gallery";
import { HomeOverview } from "./overview";
import { useHomeRedirect } from "./redirect";

export const Home = (): JSX.Element => {
	useHomeRedirect();
	return (
		<Fragment>
			<Head>
				<title>memos-pub.thien.do</title>
				<meta
					name="description"
					content="Markdown Blogging, Without Setup or Signup"
				/>
				<link rel="icon" href="/favicon.png" sizes="32x32" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</Head>
			<HomeOverview />
			<HomeGallery />
			<HomeDetail />
		</Fragment>
	);
};

Home.Layout = LayoutNone;
