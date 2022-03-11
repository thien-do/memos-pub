import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { AppLayout } from "./layout";

export const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => (
	<AppLayout>
		<Component {...pageProps} />
	</AppLayout>
);
