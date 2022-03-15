import { mdxNextComponents } from "@/lib/mdx/utils/components";
import Markdown from "./404.md";

export const AppError404 = (): JSX.Element => (
	<Markdown components={mdxNextComponents} />
);
