import { compile, CompileOptions } from "@mdx-js/mdx";
import rehypePrettyCode, { Options as rpcOptions } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import remarkToc from "remark-toc";
import { Highlighter } from "shiki";
import rehypeAutolinkHeadings, {
	Options as rahOptions,
} from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import { getMdxHighlighter } from "./highlight";
import { rcnOptions, rehypeClassName } from "./className";

const getRpcOptions = (): Partial<rpcOptions> => ({
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

const getRahOptions = (): Partial<rahOptions> => ({
	behavior: "append",
	content: { type: "text", value: "#" },
	test: ["h2", "h3", "h4", "h5", "h6"],
	properties: {
		class: "text-gray-500 absolute right-full mr-3",
	},
});

const getRcnOptions = (): rcnOptions => ({
	changes: [
		{ selector: "p:first-of-type", className: "lead" },
		{ selector: "h1,h2,h3,h4,h5,h6", className: "relative" },
	],
});

const getCompileOptions = (file: string): CompileOptions => ({
	format: getFormat(file),
	outputFormat: "function-body",
	remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkToc],
	rehypePlugins: [
		[rehypePrettyCode, getRpcOptions()],
		rehypeSlug,
		[rehypeAutolinkHeadings, getRahOptions()],
		[rehypeClassName, getRcnOptions()],
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
