import { BlogFile } from "../file/file";
import * as type from "../type";

interface Props {
	dir: type.BlogDir;
	request: type.BlogRequest;
}

export const BlogDirReadme = (props: Props): JSX.Element | null => {
	const { readme } = props.dir;
	if (readme === null) return null;
	return (
		<div className="mt-16">
			<BlogFile file={readme} />
		</div>
	);
};
