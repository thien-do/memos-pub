import { compile, CompileOptions } from "@mdx-js/mdx";
import rehypePrettyCode, * as rpc from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import { Highlighter } from "shiki";
import { getMdxHighlighter } from "./highlight";

const getRpcOptions = (): Partial<rpc.Options> => ({
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

const getCompileOptions = (file: string): CompileOptions => ({
	format: getFormat(file),
	outputFormat: "function-body",
	remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
	rehypePlugins: [[rehypePrettyCode, getRpcOptions()]],
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
