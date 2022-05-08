import {
	Options as rehypeUrlOptions,
	UrlMatch,
} from "@jsdevtools/rehype-url-inspector";

type ResolverFunc = (url: string) => string;

export interface MdxUrlResolvers {
	asset: ResolverFunc;
	link: ResolverFunc;
}

interface Props {
	resolvers: MdxUrlResolvers;
}

const rewriteImageSrc = (props: Props, match: UrlMatch): void => {
	const { resolvers } = props;
	const { url, node, propertyName } = match;
	if (node.tagName !== "img") return;
	if (propertyName !== "src") return;
	if (url.startsWith("http")) return;
	const nextUrl = resolvers.asset(url);
	node.properties = node.properties ?? {};
	node.properties["src"] = nextUrl;
};

const rewriteLinkHref = (props: Props, match: UrlMatch): void => {
	const { resolvers } = props;
	const { url, node, propertyName } = match;
	if (node.tagName !== "a") return;
	if (propertyName !== "href") return;
	if (url.startsWith("http")) return;
	if (url.startsWith("mailto")) return;
	if (url.startsWith("#")) return;
	const nextUrl = resolvers.link(url);
	node.properties = node.properties ?? {};
	node.properties["href"] = nextUrl;
};

export const getRehypeUrlOptions = (props: Props): rehypeUrlOptions => ({
	selectors: ["img[src]", "a[href]"],
	inspectEach: (match) => {
		rewriteImageSrc(props, match);
		rewriteLinkHref(props, match);
	},
});
