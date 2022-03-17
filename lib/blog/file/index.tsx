import { evaluateMdx } from "@/lib/mdx/evaluate";
import { MdxEvaluateParams } from "@/lib/mdx/evaluate/options";
import { mdxNextComponents } from "@/lib/mdx/utils/components";
import * as type from "../type";

interface Props {
	request: type.BlogRequest;
	file: type.BlogFile;
}

export const BlogFile = (props: Props): JSX.Element => {
	const { file, request } = props;
	const { content, ref } = file;
	const params: MdxEvaluateParams = { request, ref };
	const { Content } = evaluateMdx({ content, params });
	return <Content components={mdxNextComponents} />;
};
