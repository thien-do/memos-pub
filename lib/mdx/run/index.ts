import { runSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { MDXContent } from "mdx/types";

interface Result {
	Content: MDXContent;
}

export const runMdx = (code: string): Result => {
	// Need to run sync so the server build also has full html
	const mdx = runSync(code, runtime);
	const { default: Content } = mdx;
	return { Content };
};
