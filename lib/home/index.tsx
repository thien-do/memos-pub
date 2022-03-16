import { mdxNextComponents } from "@/lib/mdx/utils/components";
import Head from "next/head";
import Markdown from "./body.mdx";
import { useHomeRedirect } from "./redirect";

export const Home = (): JSX.Element => {
	useHomeRedirect();
	return (
		<div>
			<Markdown components={mdxNextComponents} />
			{/* Below Markdown to override any auto title in Markdown */}
			<Head>
				<title>Memos.pub</title>
			</Head>
		</div>
	);
};
