import Head from "next/head";
import { MDXComponents } from "mdx/types";

export const mdxNextComponents: MDXComponents = {
	// https://github.com/mdx-js/mdx/discussions/1921
	head: Head as any,
};
