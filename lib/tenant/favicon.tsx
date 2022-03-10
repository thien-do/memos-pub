import Head from "next/head";
import { ContentRequest } from "../content/type";

interface Props {
	request: ContentRequest;
}

export const TenantFavicon = (props: Props): JSX.Element => (
	<Head>
		<link
			rel="icon"
			href={`https://github.com/${props.request.owner}.png?s=48`}
			type="image/png"
		/>
	</Head>
);
