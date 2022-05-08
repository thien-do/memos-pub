import { runMdx } from "@/lib/mdx/run";
import { mdxComponents } from "@/lib/mdx/components";
import { BlogPost } from "./type";

interface Props {
	post: BlogPost;
}

export const BlogPostMain = (props: Props): JSX.Element => {
	const { code } = props.post;
	const { Content } = runMdx(code);
	return <Content components={mdxComponents} />;
};
