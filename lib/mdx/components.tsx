import Head from "next/head";
import { MDXComponents } from "mdx/types";
import Link from "next/link";

// To have client-side routing
const CustomLink: MDXComponents["a"] = (props) => (
	<Link href={props.href!}>
		<a {...props} />
	</Link>
);

/**
 * Use Next's components in MDX (e.g. Head)
 */
export const mdxComponents: MDXComponents = {
	a: CustomLink,
	// https://github.com/mdx-js/mdx/discussions/1921
	head: Head as any,
};
