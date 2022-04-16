import { runMdx } from "@/lib/mdx/run";
import { mdxNextComponents } from "@/lib/mdx/utils/components";
import { BlogPost as Post } from "./type";

interface Props {
	post: Post;
}

export const BlogPost = (props: Props): JSX.Element => {
	const { code } = props.post;
	const { Content } = runMdx(code);
	return <Content components={mdxNextComponents} />;
};
