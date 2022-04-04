import {
	Options as rehypeUrlOptions,
	UrlMatch,
} from "@jsdevtools/rehype-url-inspector";

type MdxUrlResolver<R> = (props: { url: string; request: R }) => string;

export interface MdxUrlResolvers<R> {
	asset: MdxUrlResolver<R>;
	link: MdxUrlResolver<R>;
}

interface Props<R> {
	request: R;
	resolvers: MdxUrlResolvers<R>;
}

const rewriteImageSrc = <R>(props: Props<R>, match: UrlMatch): void => {
	const { resolvers, request } = props;
	const { url, node, propertyName } = match;
	if (node.tagName !== "img") return;
	if (propertyName !== "src") return;
	if (url.startsWith("http")) return;
	const nextUrl = resolvers.asset({ request, url });
	node.properties = node.properties ?? {};
	node.properties["src"] = nextUrl;
};

const rewriteLinkHref = <R>(props: Props<R>, match: UrlMatch): void => {
	const { request, resolvers } = props;
	const { url, node, propertyName } = match;
	if (node.tagName !== "a") return;
	if (propertyName !== "href") return;
	if (url.startsWith("http")) return;
	if (url.startsWith("mailto")) return;
	const nextUrl = resolvers.link({ url, request });
	node.properties = node.properties ?? {};
	node.properties["href"] = nextUrl;
};

export const getRehypeUrlOptions = <R>(props: Props<R>): rehypeUrlOptions => ({
	selectors: ["img[src]", "a[href]"],
	inspectEach: (match) => {
		rewriteImageSrc(props, match);
		rewriteLinkHref(props, match);
	},
});
