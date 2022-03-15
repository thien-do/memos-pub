import Head from "next/head";
import React, { ReactChild } from "react";

export function CustomHead({children} :{
  children: React.ReactNode;
}) {
  const encodeTitle = () => {
    let titleEncode = '';
    try {
      if (React.Children.count(children)) {
        const titleChild = React.Children.toArray(children)?.find((item :any) => item.type === 'title')
        titleEncode = encodeURIComponent(titleChild ? titleChild?.props?.children : '');
      }
    } catch(e) {}
    return titleEncode;
  }

  const titleEncode = encodeTitle();
  
	return (
		<Head>
			{children}
      <meta property="og:image" content={`https://og-image.vercel.app/${titleEncode}.png`} />
		</Head>
	);
}