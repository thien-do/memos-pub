import { evaluateSync } from "@mdx-js/mdx";
import type { MDXContent } from "mdx/types";
import { getMdxEvaluateOptions, MdxEvaluateParams } from "./options";

interface Result {
	Content: MDXContent;
}

interface Props {
	content: string;
	params: MdxEvaluateParams;
}

/**
 * Evaluate mdx string to code (that is serializable)
 */
export const evaluateMdx = (props: Props): Result => {
	if (typeof window !== "undefined")
		throw Error("evaluateMdx should run on server only");

	const { content, params } = props;
	const options = getMdxEvaluateOptions(params);
	const mdx = evaluateSync(content, options);
	const { default: Content } = mdx;
	return { Content };
};
