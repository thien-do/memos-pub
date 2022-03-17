import { Fragment } from "react";
import * as type from "../type";
import { BlogDirBody } from "./body";
import { BlogDirOverview } from "./overview";
import { BlogDirReadme } from "./readme";

interface Props {
	dir: type.BlogDir;
	request: type.BlogRequest;
}

// If dir has only 1 file and that file is README (or index) then we can skip
// the dir title and entry list
const shouldSkip = (props: Props): boolean => {
	const { entries, readme } = props.dir;
	return entries.length === 1 && readme !== null;
};

export const BlogDir = (props: Props): JSX.Element => (
	<div>
		{shouldSkip(props) ? null : (
			<Fragment>
				<BlogDirOverview {...props} />
				<BlogDirBody {...props} />
			</Fragment>
		)}
		<BlogDirReadme dir={props.dir} />
	</div>
);
