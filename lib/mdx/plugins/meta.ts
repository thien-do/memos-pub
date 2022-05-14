import rehypeDescription from "rehype-infer-description-meta";
import rehypeTitle, { Options as RehypeTitleOptions } from "rehype-infer-title-meta";
import rehypeMeta from "rehype-meta";
import { PluggableList } from "unified";

const rehypeTitleOptions: RehypeTitleOptions = {
	selector: "h1,h2,h3",
};

export const mdxMeta: PluggableList = [
	rehypeDescription,
	[rehypeTitle, rehypeTitleOptions],
	rehypeMeta,
];
