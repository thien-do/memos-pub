import { gitHubMdxResolvers } from "@/lib/github/mdx";
import { MdxUrlResolvers } from "@/lib/mdx/compile/url";
import { MemberRequest } from "./type";

export const memberMdxResolvers: MdxUrlResolvers<MemberRequest> = {
	// This is just GitHub's absolute asset path
	asset: gitHubMdxResolvers.asset,
	link: (props) => {
		// Doesn't need to do anything since top-level linking is correct
		// (both "owner" and "repo" is covered behind the host)
		return props.url;
	},
};
