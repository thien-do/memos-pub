import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeSanitize)
	.use(rehypeStringify);

export const fileToHTML = (markdown: string): string => {
	const file = processor.processSync(markdown);
	const html = String(file);
	return html;
};
