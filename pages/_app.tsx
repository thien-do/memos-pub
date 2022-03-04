import { AppLayout } from "@/lib/app/layout";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => (
	<AppLayout>
		<Component {...pageProps} />
	</AppLayout>
);

export default CustomApp;
