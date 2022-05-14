import { compile, CompileOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { getMdxCode } from "./plugins/code";
import { mdxFrontmatter } from "./plugins/frontmatter";
import { mdxHeading } from "./plugins/heading";
import { mdxMeta } from "./plugins/meta";
import { getMdxUrl, MdxUrlResolvers } from "./plugins/url";

interface Props {
	urlResolvers: MdxUrlResolvers;
	content: string;
}

/**
 * Compile mdx string to serialisable code that can be run later by runMdx
 */
export const compileMdx = async (props: Props): Promise<string> => {
	if (typeof window !== "undefined") throw Error("compileMdx should run on server only");

	const { content, urlResolvers } = props;
	const options: CompileOptions = {
		format: "md",
		outputFormat: "function-body",
		remarkPlugins: [remarkGfm, ...mdxFrontmatter, remarkToc],
		rehypePlugins: [
			...getMdxCode(),
			...mdxHeading,
			...mdxMeta,
			...getMdxUrl({ resolvers: urlResolvers }),
		],
	};

	const code = await compile(content, options);
	const text = String(code);
	return text;
};
