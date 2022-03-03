import { compileMdx } from "@/lib/mdx/compile";
import { ContentFile, ContentRequest } from "../type";

interface Params {
	request: ContentRequest;
	content: string;
}

export const getContentFile = async (params: Params): Promise<ContentFile> => {
	const { request, content } = params;
	const name = request.path.split(" ").pop();
	if (name === undefined) throw Error("There is no file name");
	const code = await compileMdx({ name, content });
	return { type: "file", code };
};
