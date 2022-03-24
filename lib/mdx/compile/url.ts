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

/**
 * Rewrite "/" link to "./". "/" implied repo root in GitHub but doesn't work
 * in memos.pub.
 * - https://github.com/tamhoang1412/backend-swe-interview-questions/pull/2
 */
const rewriteRootLink = (match: UrlMatch): void => {
	const { url, node, propertyName } = match;
	if (node.tagName !== "a") return;
	if (propertyName !== "href") return;
	if (url.startsWith("/") === false) return;
	const nextUrl = url.replace("/", "./");
	node.properties = node.properties ?? {};
	node.properties["href"] = nextUrl;
};

export const getRehypeUrlOptions = <R>(props: Props<R>): rehypeUrlOptions => {
	return {
		selectors: ["img[src]", "a[href]"],
		inspectEach: (match) => {
			rewriteImageSrc(props, match);
			rewriteRootLink(match);
		},
	};
};
