import { BlogDir, BlogDirProps } from "@/lib/blog/dir";
import { BlogGitLabRequest } from "../type";
import { BlogGitLabDirBody } from "./body";
import { BlogGitLabDirOverview } from "./overview";

type Props = BlogDirProps<BlogGitLabRequest>;

const getBody = (props: Props): JSX.Element => (
	<BlogGitLabDirBody dir={props.dir} request={props.request} />
);
const getOverview = (props: Props): JSX.Element => (
	<BlogGitLabDirOverview dir={props.dir} request={props.request} />
);

export const BlogGitLabDir = (props: Props): JSX.Element => (
	<BlogDir
		dir={props.dir}
		request={props.request}
		getBody={getBody}
		getOverview={getOverview}
	/>
);
