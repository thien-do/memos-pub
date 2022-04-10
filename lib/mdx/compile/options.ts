import { BlogRequestBase } from "@/lib/blog/type";
import rehypeUrl from "@jsdevtools/rehype-url-inspector";
import { CompileOptions } from "@mdx-js/mdx";
import rehypeAutolinkHeadings, {
	Options as rehypeLinkOptions,
} from "rehype-autolink-headings";
import rehypeInferDescriptionMeta from "rehype-infer-description-meta";
import rehypeInferTitleMeta, {
	Options as rehypeTitleOptions,
} from "rehype-infer-title-meta";
import rehypeMeta from "rehype-meta";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import remarkToc from "remark-toc";
import { getRehypeCodeOptions } from "./code";
import { getRehypeUrlOptions, MdxUrlResolvers } from "./url";

const getFormat = (path: string): CompileOptions["format"] => {
	const fileName = path.split("/").pop();
	if (fileName === undefined) throw Error(`No file found: "${path}"`);
	if (fileName.endsWith(".mdx")) return "mdx";
	if (fileName.endsWith(".md")) return "md";
	if (fileName.endsWith(".markdown")) return "md";
	throw Error(`Unknown extension "${fileName}"`);
};

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

interface Props<R> {
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

export type GetMdxCompileOptionsProps<R> = Props<R>;

export const getMdxCompileOptions = <R extends BlogRequestBase>(
	props: Props<R>
): CompileOptions => {
	const { resolvers, request } = props;
	return {
		format: getFormat(request.path),
		outputFormat: "function-body",
		remarkPlugins: [
			remarkGfm,
			remarkFrontmatter,
			remarkMdxFrontmatter,
			remarkToc,
		],
		rehypePlugins: [
			[rehypePrettyCode, getRehypeCodeOptions()],
			rehypeSlug,
			rehypeInferDescriptionMeta,
			[rehypeInferTitleMeta, getRehypeTitleOptions()],
			rehypeMeta,
			[rehypeAutolinkHeadings, getRehypeLinkOptions()],
			[rehypeUrl, getRehypeUrlOptions({ resolvers, request })],
		],
	};
};
