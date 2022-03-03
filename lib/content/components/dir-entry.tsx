import * as type from "../type";
import Link from "next/link";

interface Props {
	entry: type.ContentDirEntry;
	request: type.ContentRequest;
}

const getHref = (props: Props): string => {
	const { entry, request } = props;
	// don't need "user" here because we redirect inside subdomain
	const { repo, path } = request;
	// "path" is the only part that may be empty
	const pathSegment = path === "" ? "" : `/${path}`;
	const href = `/${repo}${pathSegment}/${entry.name}`;
	return href;
};

export const ContentDirEntry = (props: Props): JSX.Element => (
	<Link href={getHref(props)}>
		<a target="_self" className="font-normal no-underline">
			{props.entry.name}
			{props.entry.type === "dir" ? "/" : ""}
		</a>
	</Link>
);
