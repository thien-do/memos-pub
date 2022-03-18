import { BlogGitlabRequest } from "@/lib/blog-gitlab/type";
import { BlogRequestWithRef } from "@/lib/blog/type";
import { compile } from "@mdx-js/mdx";
import { getMdxCompileOptions } from "./options";

interface Props {
	content: string;
	request: BlogRequestWithRef | BlogGitlabRequest;
}

/**
 * Evaluate mdx string to code (that is serializable)
 */
export const compileMdx = async (props: Props): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("evaluateMdx should run on server only");

	const { content, request } = props;
	const options = getMdxCompileOptions(request);
	const code = await compile(content, options);
	const text = String(code);
	return text;
};
