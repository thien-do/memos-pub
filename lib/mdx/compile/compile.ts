import { compile } from "@mdx-js/mdx";
import { getMdxCompileOptions } from "./options";
import { MdxUrlResolvers } from "./url";

interface Props {
	urlResolvers: MdxUrlResolvers;
	content: string;
}

/**
 * Compile mdx string to serialisable code that can be run later by runMdx
 */
export const compileMdx = async (props: Props): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("compileMdx should run on server only");

	const { content, urlResolvers } = props;
	const options = getMdxCompileOptions({ urlResolvers });
	const code = await compile(content, options);
	const text = String(code);
	return text;
};
