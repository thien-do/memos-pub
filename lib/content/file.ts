import { compile } from "@mdx-js/mdx";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import { ContentFile } from "./type";
import * as shiki from "shiki";
import path from "path";
import fs from "fs";

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the paths
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => {
	return path.join(process.cwd(), "lib", "shiki");
};

const options: Partial<Options> = {
	getHighlighter: () => {
		return shiki.getHighlighter({
			theme: "github-dark",
			paths: {
				languages: `${getShikiPath()}/languages/`,
				themes: `${getShikiPath()}/themes/`,
			},
			// Wrong typing by rehype-pretty-code
			// See: https://github.com/atomiks/rehype-pretty-code/pull/24
		}) as unknown as shiki.Highlighter;
	},
};

const compileMarkdown = async (markdown: string): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("markdown compiling should run on server only");

	const fn = await compile(markdown, {
		format: "md",
		outputFormat: "function-body",
		remarkPlugins: [remarkFrontmatter],
		rehypePlugins: [[rehypePrettyCode, options]],
	});
	const code = String(fn);
	return code;
};

export const makeContentFile = async (
	markdown: string
): Promise<ContentFile> => {
	const code = await compileMarkdown(markdown);
	return { type: "file", code };
};
