import {
	Options as rehypeUrlOptions,
	UrlMatch,
} from "@jsdevtools/rehype-url-inspector";

export type MdxResolveUrl<R> = (props: { url: string; request: R }) => string;

interface Props<R> {
	request: R;
	resolveUrl: MdxResolveUrl<R>;
}

const rewriteImageSrc = <R>(props: Props<R>, match: UrlMatch): void => {
	const { resolveUrl, request } = props;
	const { url, node, propertyName } = match;
	if (node.tagName !== "img") return;
	if (propertyName !== "src") return;
	if (url.startsWith("http")) return;
	const raw = resolveUrl({ request, url });
	node.properties = node.properties ?? {};
	node.properties["src"] = raw;
};

export const getRehypeUrlOptions = <R>(props: Props<R>): rehypeUrlOptions => {
	return {
		selectors: ["img[src]"],
		inspectEach: (match) => {
			rewriteImageSrc(props, match);
		},
	};
};
