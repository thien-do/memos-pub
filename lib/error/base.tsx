import Head from "next/head";
import { useEffect, useState } from "react";
import { getEnvRootHost } from "../env";

interface Props {
	title: string;
	children: string;
}

const root = getEnvRootHost();

export const ErrorBase = (props: Props): JSX.Element => {
	// Default to true to avoid showing memos-pub.thien.do reference in member's page
	// in first render (or renders without JS)
	const [isMember, setIsMember] = useState(true);

	useEffect(() => {
		const isMember = location.host.endsWith(root) === false;
		setIsMember(isMember);
	}, []);

	const actions = (
		<ul>
			{/* Maybe we could let member specify the report link? */}
			{isMember ? null : (
				<li>
					<a
						href="https://github.com/thien-do/memos-pub/issues/new"
						target="_blank"
						rel="noreferrer"
					>
						Report this
					</a>
				</li>
			)}
			<li>
				<a href={isMember ? "/" : `https://${root}`}>Go home</a>
			</li>
		</ul>
	);

	return (
		<div>
			<Head>
				<title>{props.title}</title>
			</Head>
			<h1>{props.title}</h1>
			<p>
				That&apos;s an error.{" "}
				<span dangerouslySetInnerHTML={{ __html: props.children }} />
			</p>
			<p>Here are things you can do:</p>
			{actions}
		</div>
	);
};
