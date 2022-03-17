import { components } from "@octokit/openapi-types";
import { BlogFile } from "../type";

type RawFile = components["schemas"]["content-file"];

interface Props {
	response: RawFile;
}

export const parseBlogFile = async (props: Props): Promise<BlogFile> => {
	const { response } = props;

	if (!("content" in response)) throw Error("File doesn't have content");
	const content = Buffer.from(response.content, "base64").toString();

	const ref = response.url.split("?ref=").pop();
	if (ref === undefined) throw Error("Branch is not defined");

	return { type: "file", content, ref };
};
