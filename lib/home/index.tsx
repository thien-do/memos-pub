import Head from "next/head";
import { NoLayout } from "../app/main";
import { HomeDetail } from "./detail";
import { HomeGallery } from "./gallery";
import { HomeOverview } from "./overview";
import { useHomeRedirect } from "./redirect";

export const Home = (): JSX.Element => {
	useHomeRedirect();
	return (
		<div>
			<HomeOverview />
			<HomeGallery />
			<HomeDetail />
			{/* Below Markdown to override any auto title in Markdown */}
			<Head>
				<title>Memos.pub</title>
			</Head>
		</div>
	);
};

Home.Layout = NoLayout;
