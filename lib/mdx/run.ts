import { runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { MDXContent } from "mdx/types";

interface Result {
	Content: MDXContent;
	// Meta comes from frontmatter, which is technically in freeform. We only
	// try to support some common fields.
	meta: undefined | { title?: string; date?: string };
}

export const runMdx = (code: string): Result => {
	// Need to run sync so the server build also has full html
	const mdx = runSync(code, runtime);
	const { default: Content, meta } = mdx;
	return { Content, meta };
};
