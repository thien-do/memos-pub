import { compileMdx } from "@/lib/mdx/compile";
import { components } from "@octokit/openapi-types";
import { resolveBlogMdxUrl } from "../mdx/url";
import { BlogFile, BlogRequest, BlogRequestWithRef } from "../type";

type RawFile = components["schemas"]["content-file"];

interface Props {
	response: RawFile;
	request: BlogRequest;
}

export const parseBlogFile = async (props: Props): Promise<BlogFile> => {
	const { response } = props;

	const ref = response.url.split("?ref=").pop();
	if (ref === undefined) throw Error("Branch is not defined");
	const request: BlogRequestWithRef = { ...props.request, ref };

	if (!("content" in response)) throw Error("File doesn't have content");

	const code = await compileMdx({
		content: Buffer.from(response.content, "base64").toString(),
		options: { request, resolveUrl: resolveBlogMdxUrl },
	});

	return { type: "file", code };
};
