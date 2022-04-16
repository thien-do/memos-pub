import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactNode } from "react";
import { LayoutProse } from "./prose";

interface Props {
	children: ReactNode;
}

type Layout = (props: Props) => JSX.Element;

type NextPageWithLayout = NextPage & {
	Layout?: Layout;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export const LayoutNone: Layout = (props) => <>{props.children}</>;

export const LayoutMain = (props: AppPropsWithLayout): JSX.Element => {
	const { Component, pageProps } = props;
	// Use the layout defined at the page level, if available
	const Layout = Component.Layout ?? LayoutProse;
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
};
