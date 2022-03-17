import { compile } from "@mdx-js/mdx";
import { getMdxCompileOptions, MdxCompileParams } from "./options";

/**
 * Evaluate mdx string to code (that is serializable)
 */
export const compileMdx = async (
	content: string,
	params: MdxCompileParams
): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("evaluateMdx should run on server only");

	const options = getMdxCompileOptions(params);
	const code = await compile(content, options);
	const text = String(code);
	return text;
};
