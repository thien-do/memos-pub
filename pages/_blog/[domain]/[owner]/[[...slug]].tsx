import type { GetStaticPaths, GetStaticProps } from "next";
import { getBlogPageProps } from "@/lib/blog/page/props";
import { getBlogPagePaths } from "@/lib/blog/page/paths";
import { BlogPageParams, BlogPageProps } from "@/lib/blog/page/type";

export { BlogPageMain as default } from "@/lib/blog/page/main";

// getStaticProps and getStaticPaths cannot be re-exported like components as it
// would break Next's tree-shaking resolving and result in a module-not-found
// error. See:
// - https://nextjs.org/docs/messages/module-not-found#the-module-youre-trying-to-import-uses-nodejs-specific-modules
export const getStaticProps: GetStaticProps<
	BlogPageProps,
	BlogPageParams
> = async (context) => {
	return getBlogPageProps(context);
};

export const getStaticPaths: GetStaticPaths = async (context) => {
	return getBlogPagePaths(context);
};
