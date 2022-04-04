import Link from "next/link";

export interface BlogBreadcrumbItem {
	href: string;
	children: string;
	image?: string;
}

interface Props {
	item: BlogBreadcrumbItem;
}

export const BlogBreadcrumbItemLink = (props: Props): JSX.Element => (
	<Link href={props.item.href}>
		<a
			className={[
				"font-normal no-underline not-prose",
				"flex items-center",
			].join(" ")}
		>
			{props.item.image && (
				<img
					src={props.item.image}
					alt=""
					width="32"
					height="32"
					className="rounded-full mr-3"
				/>
			)}
			<span>{props.item.children}</span>
		</a>
	</Link>
);
