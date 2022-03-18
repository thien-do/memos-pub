import { Options as rehypeUrlOptions } from "@jsdevtools/rehype-url-inspector";

export type MdxResolveUrl<R> = (props: { url: string; request: R }) => string;

interface Props<R> {
	request: R;
	resolveUrl: MdxResolveUrl<R>;
}

export const getRehypeUrlOptions = <R>(props: Props<R>): rehypeUrlOptions => {
	const { resolveUrl, request } = props;
	return {
		selectors: ["img[src]"],
		inspectEach: (match) => {
			const { url, node, propertyName } = match;
			if (node.tagName !== "img") return;
			if (propertyName !== "src") return;
			if (url.startsWith("http")) return;
			const raw = resolveUrl({ request, url });
			node.properties = node.properties ?? {};
			node.properties["src"] = raw;
		},
	};
};
