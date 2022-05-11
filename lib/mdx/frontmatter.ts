import remarkFrontmatter, { Options } from "remark-frontmatter";
import {
	remarkMdxFrontmatter,
	RemarkMdxFrontmatterOptions,
} from "remark-mdx-frontmatter";
import { PluggableList } from "unified";

const options: Options = ["toml", "yaml"];

const mdxOptions: RemarkMdxFrontmatterOptions = { name: "meta" };

export const mdxFrontmatter: PluggableList = [
	[remarkFrontmatter, options],
	[remarkMdxFrontmatter, mdxOptions],
];
