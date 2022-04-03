import { BlogDir, BlogDirProps } from "@/lib/blog/dir";
import { MemberBlogRequest } from "../type";
import { MemberBlogDirBody } from "./body";
import { MemberBlogDirOverview } from "./overview";

type Props = BlogDirProps<MemberBlogRequest>;

const getBody = (props: Props): JSX.Element => (
	<MemberBlogDirBody dir={props.dir} request={props.request} />
);
const getOverview = (props: Props): JSX.Element => (
	<MemberBlogDirOverview dir={props.dir} request={props.request} />
);

export const MemberBlogDir = (props: Props): JSX.Element => (
	<BlogDir
		dir={props.dir}
		request={props.request}
		getBody={getBody}
		getOverview={getOverview}
	/>
);
