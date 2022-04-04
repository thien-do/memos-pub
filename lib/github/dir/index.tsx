import { BlogDir, BlogDirProps } from "@/lib/blog/dir";
import { BlogGitHubRequest } from "../type";
import { BlogGitHubDirBody } from "./body";
import { BlogGitHubDirOverview } from "./overview";

type Props = BlogDirProps<BlogGitHubRequest>;

const getBody = (props: Props): JSX.Element => (
	<BlogGitHubDirBody dir={props.dir} request={props.request} />
);
const getOverview = (props: Props): JSX.Element => (
	<BlogGitHubDirOverview dir={props.dir} request={props.request} />
);

export const BlogGitHubDir = (props: Props): JSX.Element => (
	<BlogDir
		dir={props.dir}
		request={props.request}
		getBody={getBody}
		getOverview={getOverview}
	/>
);
