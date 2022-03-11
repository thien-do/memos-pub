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
import rehypeUrl from "@jsdevtools/rehype-url-inspector";
import { getRehypeUrlOptions } from "./url";
import { ContentRequest } from "../content/type";

const getRehypeCodeOptions = (): Partial<rehypeCodeOptions> => ({
	// Need to use a custom highlighter because rehype-pretty-code doesn't
	// let us customize "paths". Also wrong typing by rehype-pretty-code
	// See: https://github.com/atomiks/rehype-pretty-code/pull/24
	getHighlighter: getMdxHighlighter as unknown as () => Highlighter,
});

const getFormat = (options: Options): CompileOptions["format"] => {
	const path = options.request.path;
	const fileName = path.split("/").pop();
	if (fileName === undefined) throw Error(`No file found: "${path}"`);
	if (fileName.endsWith(".mdx")) return "mdx";
	if (fileName.endsWith(".md")) return "md";
	throw Error(`Unknown extension "${fileName}"`);
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

const getCompileOptions = (options: Options): CompileOptions => {
	const { branch, request } = options;
	return {
		format: getFormat(options),
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
			[rehypeUrl, getRehypeUrlOptions({ branch, request })],
		],
	};
};

interface Options {
	request: ContentRequest;
	/** Brach of the content, known from GH's response */
	branch: string;
}

/**
 * Compile mdx string to code (that is serializable)
 */
export const compileMdx = async (
	content: string,
	options: Options
): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("compileMdx should run on server only");

	const fn = await compile(content, getCompileOptions(options));
	const code = String(fn);

	return code;
};
