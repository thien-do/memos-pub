import { mdxNextComponents } from "@/lib/mdx/utils/components";
import Markdown from "./body.mdx";
import { useHomeRedirect } from "./redirect";

export const Home = (): JSX.Element => {
	useHomeRedirect();
	return <Markdown components={mdxNextComponents} />;
};
