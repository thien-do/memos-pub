import { runMdx } from "@/lib/mdx/run";
import { mdxNextComponents } from "@/lib/mdx/utils/components";
import * as type from "./type";

interface Props {
	file: type.BlogFile;
}

export const BlogFile = (props: Props): JSX.Element => {
	const { code } = props.file;
	const { Content } = runMdx(code);
	return <Content components={mdxNextComponents} />;
};
