import Head from "next/head";
import HomeBody from "@/lib/home/body.md";
import { Fragment } from "react";
import { useHomeRedirect } from "@/lib/home/redirect";

const HomePage = (): JSX.Element => {
	useHomeRedirect();
	return (
		<Fragment>
			<Head>
				<title>memos.pub</title>
			</Head>
			<HomeBody />
		</Fragment>
	);
};

export default HomePage;
