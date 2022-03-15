import Head from "next/head";
import { BlogRequest } from "../type";

interface Props {
	request: BlogRequest;
}

export const BlogFavicon = (props: Props): JSX.Element => (
	<Head>
		<link
			rel="icon"
			href={`https://github.com/${props.request.owner}.png?size=48`}
			type="image/png"
		/>
	</Head>
);
