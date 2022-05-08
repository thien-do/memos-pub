import Head from "next/head";
import { MDXComponents } from "mdx/types";

/**
 * Use Next's components in MDX (e.g. Head)
 */
export const mdxComponents: MDXComponents = {
	// https://github.com/mdx-js/mdx/discussions/1921
	head: Head as any,
};
