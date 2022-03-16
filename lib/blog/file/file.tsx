import { runMdx } from "@/lib/mdx/run";
import { mdxNextComponents } from "@/lib/mdx/utils/components";
import { useMemo } from "react";
import { MDXComponents } from "mdx/types";
import * as type from "../type";

interface Props {
	file: type.BlogFile;
  request: type.BlogRequest;
}

export const addProps = (components : MDXComponents, defaultProps : any) => {
  const withProps:MDXComponents = {};

  for (const [key, Com] of Object.entries(components)) {
    const Component : React.ElementType = Com as React.ElementType;
    withProps[key] = (props:any) => <Component {...defaultProps} {...props} />
  }

  return withProps;
}

export const BlogFile = (props: Props): JSX.Element => {
	const { code } = props.file;
	const { Content } = runMdx(code);

  const mdxNextComponentsWithProps = useMemo(
    () => addProps(mdxNextComponents, props),
    [props]
  );

	return <Content components={mdxNextComponentsWithProps} />;
};
