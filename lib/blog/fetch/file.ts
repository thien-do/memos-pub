import { compileMdx } from "@/lib/mdx/compile";
import { components } from "@octokit/openapi-types";
import { BlogFile, BlogRequest } from "../type";

type RawFile = components["schemas"]["content-file"];

interface Props {
	request: BlogRequest;
	response: RawFile;
}

export const parseBlogFile = async (props: Props): Promise<BlogFile> => {
	const { request, response } = props;

	if (!("content" in response)) throw Error("File doesn't have content");
	const content = Buffer.from(response.content, "base64").toString();

	const branch = response.url.split("?ref=").pop();
	if (branch === undefined) throw Error("Branch is not defined");

	const code = await compileMdx(content, { branch, request });
	return { type: "file", code };
};
