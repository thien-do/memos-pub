import { compile, CompileOptions } from "@mdx-js/mdx";
import rehypeAutolinkHeadings, {
	Options as rehypeLinkOptions,
} from "rehype-autolink-headings";
import rehypeInferDescriptionMeta from "rehype-infer-description-meta";
import rehypeInferTitleMeta, {
	Options as rehypeTitleOptions,
} from "rehype-infer-title-meta";
import rehypeMeta from "rehype-meta";
import rehypePrettyCode, {
	Options as rehypeCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import remarkToc from "remark-toc";
import { Highlighter } from "shiki";
import { rehypeClassName, rehypeClassNameOptions } from "./className";
import { getMdxHighlighter } from "./highlight";

const getRehypeCodeOptions = (): Partial<rehypeCodeOptions> => ({
	// Need to use a custom highlighter because rehype-pretty-code doesn't
	// let us customize "paths". Also wrong typing by rehype-pretty-code
	// See: https://github.com/atomiks/rehype-pretty-code/pull/24
	getHighlighter: getMdxHighlighter as unknown as () => Highlighter,
});

const getFormat = (file: string): CompileOptions["format"] => {
	if (file.endsWith(".mdx")) return "mdx";
	if (file.endsWith(".md")) return "md";
	throw Error(`Unknown extension "${file}"`);
};

const getRehypeLinkOptions = (): Partial<rehypeLinkOptions> => ({
	behavior: "append",
	content: { type: "text", value: "#" },
	properties: {
		class: "text-gray-500 absolute right-full top-0 mr-3",
	},
});

const getRehypeTitleOptions = (): rehypeTitleOptions => ({
	selector: "h1,h2,h3",
});

const getRehypeClassNameOptions = (): rehypeClassNameOptions => ({
	changes: [
		{ selector: "p:first-child", className: "lead" },
		{ selector: "h1,h2,h3,h4,h5,h6", className: "relative" },
	],
});

const getCompileOptions = (file: string): CompileOptions => ({
	format: getFormat(file),
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
		[rehypeClassName, getRehypeClassNameOptions()],
	],
});

interface Params {
	/** Name of the file we will process, to decide md or mdx */
	name: string;
	/** MDX text content */
	content: string;
}

/**
 * Compile mdx string to code (that is serializable)
 */
export const compileMdx = async (params: Params): Promise<string> => {
	const { name, content } = params;

	if (typeof window !== "undefined")
		throw Error("compileMdx should run on server only");

	const fn = await compile(content, getCompileOptions(name));
	const code = String(fn);

	return code;
};
