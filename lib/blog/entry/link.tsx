import { BlogRequest } from "../request/type";
import Link from "next/link";
import { join as pathJoin } from "path";
import { BlogEntry } from "./type";

interface Props {
	entry: BlogEntry;
	request: BlogRequest;
}

export const BlogEntryLink = (props: Props): JSX.Element => {
	const { entry, request } = props;

	const link = (
		<a
			target="_self"
			className={[
				"flex items-baseline font-normal no-underline",
				"flex-col sm:flex-row",
			].join(" ")}
		>
			{entry.date && (
				<span className="flex-0 mr-6 text-gray-500 dark:text-gray-400">
					{entry.date}
				</span>
			)}
			<span className="flex-1 overflow-hidden">{entry.title}</span>
		</a>
	);

	return (
		<li className={entry.type === "list" ? "list-[disclosure-closed]" : ""}>
			<Link href={getHref({ entry, request })}>{link}</Link>
		</li>
	);
};

const getHref = (props: Props): string => {
	const { entry, request } = props;
	const { repo, path, domain } = request;
	const href = `/${pathJoin(domain ? "" : repo, path, entry.name)}`;
	return href;
};
