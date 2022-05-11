import { MemberPath, MEMBER_LIST } from "@/lib/member/list";
import { GetStaticPaths } from "next";
import { BlogPageParams } from "./type";

const toParams = (path: MemberPath): BlogPageParams => {
	const [owner, ...slug] = path.to.split("/");
	return { domain: path.from, owner, slug };
};

export const getBlogPagePaths: GetStaticPaths = async () => ({
	fallback: "blocking",
	paths: MEMBER_LIST.map(toParams).map((params) => ({ params })),
});
