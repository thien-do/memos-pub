import { BlogGitlabRequest } from "@/lib/blog-gitlab/type";
import { BlogRequestWithRef } from "@/lib/blog/type";
import rehypeUrl from "@jsdevtools/rehype-url-inspector";
import { CompileOptions } from "@mdx-js/mdx";
import * as runtimeRaw from "react/jsx-runtime.js";
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
import { getMdxHighlighter } from "./highlight";
import { getRehypeUrlOptions } from "./url";

// Will pass this directly to evaluate function
// https://mdxjs.com/packages/mdx/#optionsjsx-1
const runtime = runtimeRaw as any;

type CommonRequest = BlogRequestWithRef | BlogGitlabRequest;

const getRehypeCodeOptions = (): Partial<rehypeCodeOptions> => ({
	// Need to use a custom highlighter because rehype-pretty-code doesn't
	// let us customize "paths". Also wrong typing by rehype-pretty-code
	// See: https://github.com/atomiks/rehype-pretty-code/pull/24
	getHighlighter: getMdxHighlighter as unknown as () => Highlighter,
});

const getFormat = (request: CommonRequest): CompileOptions["format"] => {
	const path = request.path;
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
			"text-gray-400 no-underline",
			"sm:absolute sm:right-full sm:top-0 sm:mr-3",
		].join(" "),
	},
});

const getRehypeTitleOptions = (): rehypeTitleOptions => ({
	selector: "h1,h2,h3",
});

export const getMdxCompileOptions = (
	request: CommonRequest
): CompileOptions => {
	return {
		format: getFormat(request),
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
			[rehypeUrl, getRehypeUrlOptions(request)],
		],
	};
};
