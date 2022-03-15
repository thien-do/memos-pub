import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { AppMainLayout } from "./layout";

export const AppMain = ({ Component, pageProps }: AppProps): JSX.Element => (
	<AppMainLayout>
		<Component {...pageProps} />
	</AppMainLayout>
);
