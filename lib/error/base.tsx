import Head from "next/head";
import { Fragment } from "react";
import Markdown from "./base.mdx";

interface Props {
	title: string;
	children: string;
}

export const ErrorBase = (props: Props): JSX.Element => (
	<Fragment>
		<Head>
			<title>{props.title}</title>
		</Head>
		<Markdown title={props.title}>{props.children}</Markdown>
	</Fragment>
);
