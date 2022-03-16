import Head from "next/head";
import React from "react";
import { getItems } from "@/lib/blog/page/breadcrumb";
import { base64_encode } from "@/lib/app/utils/base64";

export function CustomHead(props: { children: any; request: any }) {
  const {children, request} = props;
  const { owner = ''} = request;
  const breadcrumb = `${owner}${getItems(props).pop()}`;
  
  const getTitle = () => {
    let title = '';
    if (React.Children.count(children)) {
      const title_children = React.Children.toArray(children)?.find((item :any) => item.type === 'title')
      if (React.isValidElement(title_children)) {
        title = title_children ? title_children?.props?.children : ''
      }
    }
    return title
  }

  const title = getTitle()
  const file_data = [owner, breadcrumb, title].join(' *=* ')
  const encode_file_data = base64_encode(file_data);
  const root_host = process.env.NODE_ENV === 'production' ? 'https://memos.pub' : 'http://localhost:3000';
  
	return (
		<Head>
			{children}
      <meta property="og:image" content={`${root_host}/api/image?t=${encode_file_data}`} />
		</Head>
	);
}