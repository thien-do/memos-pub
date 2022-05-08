import { BlogList } from "@/lib/blog/list/type";
import { GitHubDir } from "@/lib/github/type";
import { BlogConfig } from "../config/type";
import { isBlogEntryFile, parseBlogEntryFromFile } from "../entry/parse/file";
import { BlogPost } from "../post/type";

interface Props {
	dir: GitHubDir;
	readme: BlogPost | null;
	config: BlogConfig | null;
}

export const parseBlogList = (props: Props): BlogList => {
	const { dir, readme, config } = props;

	const entries = dir
		.filter(isBlogEntryFile)
		.map(parseBlogEntryFromFile({ config }));

	const list: BlogList = { type: "list", entries, readme };
	return list;
};
