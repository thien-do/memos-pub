import { BlogRequest } from "@/lib/blog/type";
import { Options as rehypeUrlOptions } from "@jsdevtools/rehype-url-inspector";
import nodepath from "path";

interface Props {
	request: BlogRequest;
	ref: string;
}

const getRaw = (props: Props, assetUrl: string): string => {
	const { ref, request } = props;
	const { owner, repo, path: mdPath } = request;
	const dirname = nodepath.dirname(mdPath);
	const assetPath = nodepath.join(dirname, assetUrl);
	const origin = "https://raw.githubusercontent.com";
	return `${origin}/${owner}/${repo}/${ref}/${assetPath}`;
};

export const getRehypeUrlOptions = (props: Props): rehypeUrlOptions => ({
	selectors: ["img[src]"],
	inspectEach: (match) => {
		const { url, node, propertyName } = match;
		if (node.tagName !== "img") return;
		if (propertyName !== "src") return;
		if (url.startsWith("http")) return;
		const raw = getRaw(props, url);
		node.properties = node.properties ?? {};
		node.properties["src"] = raw;
	},
});
