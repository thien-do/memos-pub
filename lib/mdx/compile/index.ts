import { compile } from "@mdx-js/mdx";
import { getMdxCompileOptions, GetMdxCompileOptionsProps } from "./options";

interface Props<R> {
	options: GetMdxCompileOptionsProps<R>;
	content: string;
}

/**
 * Evaluate mdx string to code (that is serializable)
 */
export const compileMdx = async <R extends { path: string }>(
	props: Props<R>
): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("evaluateMdx should run on server only");

	const options = getMdxCompileOptions<R>(props.options);
	const code = await compile(props.content, options);
	const text = String(code);
	return text;
};
