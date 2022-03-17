import { BlogFile } from "../file";
import * as type from "../type";

interface Props {
	dir: type.BlogDir;
}

export const BlogDirReadme = (props: Props): JSX.Element | null => {
	const { dir } = props;
	const { readme } = dir;
	if (readme === null) return null;
	return (
		<div className="mt-16">
			<BlogFile file={readme} />
		</div>
	);
};
