import remarkGfm from "remark-gfm";
import mdx from "@next/mdx";

const withMDX = mdx({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [],
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
