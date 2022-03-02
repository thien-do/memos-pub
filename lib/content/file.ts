import { compile } from "@mdx-js/mdx";
import { ContentFile } from "./type";

const compileMarkdown = async (markdown: string): Promise<string> => {
	if (typeof window !== "undefined")
		throw Error("markdown to HTML should run on server only");

	const fn = await compile(markdown, { outputFormat: "function-body" });
	const code = String(fn);
	return code;
};

export const makeContentFile = async (
	markdown: string
): Promise<ContentFile> => {
	const code = await compileMarkdown(markdown);
	return { type: "file", code };
};
