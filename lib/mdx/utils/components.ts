import Head from "next/head";
import { MDXComponents } from "mdx/types";
import { CustomHead } from "./head";

export const mdxNextComponents: MDXComponents = {
	// https://github.com/mdx-js/mdx/discussions/1921
	head: CustomHead as any,
};
