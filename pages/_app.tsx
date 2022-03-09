import { ProseLayout } from "@/lib/prose/layout";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => (
	<ProseLayout>
		<Component {...pageProps} />
	</ProseLayout>
);

export default CustomApp;
