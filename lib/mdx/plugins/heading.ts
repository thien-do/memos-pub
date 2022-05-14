import rehypeLink, { Options as RehypeLinkOptions } from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { PluggableList } from "unified";

const rehypeLinkOptions: RehypeLinkOptions = {
	behavior: "prepend",
	content: { type: "text", value: "# " },
	properties: {
		class: [
			"text-gray-300 dark:text-gray-600 no-underline",
			"sm:absolute sm:right-full sm:top-0 sm:mr-3",
		].join(" "),
	},
};

export const mdxHeading: PluggableList = [rehypeSlug, [rehypeLink, rehypeLinkOptions]];
