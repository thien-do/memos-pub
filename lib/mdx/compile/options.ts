import rehypeUrl from "@jsdevtools/rehype-url-inspector";
import { CompileOptions } from "@mdx-js/mdx";
import rehypeAutolinkHeadings, { Options as rehypeLinkOptions } from "rehype-autolink-headings";
import rehypeInferDescriptionMeta from "rehype-infer-description-meta";
import rehypeInferTitleMeta, { Options as rehypeTitleOptions } from "rehype-infer-title-meta";
import rehypeMeta from "rehype-meta";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { mdxFrontmatter } from "../frontmatter";
import { getRehypeCodeOptions } from "./code";
import { getRehypeUrlOptions, MdxUrlResolvers } from "./url";

const getRehypeLinkOptions = (): Partial<rehypeLinkOptions> => ({
	behavior: "prepend",
	content: { type: "text", value: "# " },
	properties: {
		class: [
			"text-gray-300 dark:text-gray-600 no-underline",
			"sm:absolute sm:right-full sm:top-0 sm:mr-3",
		].join(" "),
	},
});

const getRehypeTitleOptions = (): rehypeTitleOptions => ({
	selector: "h1,h2,h3",
});

interface Props {
	urlResolvers: MdxUrlResolvers;
}

export const getMdxCompileOptions = (props: Props): CompileOptions => ({
	format: "md",
	outputFormat: "function-body",
	remarkPlugins: [remarkGfm, ...mdxFrontmatter, remarkToc],
	rehypePlugins: [
		[rehypePrettyCode, getRehypeCodeOptions()],
		rehypeSlug,
		rehypeInferDescriptionMeta,
		[rehypeInferTitleMeta, getRehypeTitleOptions()],
		rehypeMeta,
		[rehypeAutolinkHeadings, getRehypeLinkOptions()],
		[rehypeUrl, getRehypeUrlOptions({ resolvers: props.urlResolvers })],
	],
});
