import mdx from "@next/mdx";
import rehypeInferDescriptionMeta from "rehype-infer-description-meta";
import rehypeInferTitleMeta from "rehype-infer-title-meta";
import rehypeMeta from "rehype-meta";
import remarkGfm from "remark-gfm";

const getRehypeTitleOptions = () => ({
	selector: "h1,h2,h3",
});

const withMDX = mdx({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeInferDescriptionMeta,
			[rehypeInferTitleMeta, getRehypeTitleOptions()],
			rehypeMeta,
		],
		// If you use `MDXProvider`, uncomment the following line.
		// providerImportSource: "@mdx-js/react",
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
