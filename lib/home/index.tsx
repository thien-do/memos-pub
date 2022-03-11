import Head from "next/head";
import HomeBody from "@/lib/home/body.md";
import { Fragment } from "react";
import { useHomeRedirect } from "@/lib/home/redirect";

export const HomePage = (): JSX.Element => {
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
