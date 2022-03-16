import { mdxNextComponents } from "@/lib/mdx/utils/components";
import Markdown from "./body.mdx";
import { useAppHomeRedirect } from "./redirect";

export const AppHome = (): JSX.Element => {
	useAppHomeRedirect();
	return <Markdown components={mdxNextComponents} />;
};
