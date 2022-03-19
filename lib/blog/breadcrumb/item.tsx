import Link from "next/link";

export interface BlogBreadcrumbItemProps {
	href: string;
	children: string;
	image?: string;
}

export const BlogBreadcrumbItem = (
	props: BlogBreadcrumbItemProps
): JSX.Element => (
	<Link href={props.href}>
		<a
			className={[
				"font-normal no-underline not-prose",
				"flex items-center",
			].join(" ")}
		>
			{props.image && (
				<img
					src={props.image}
					alt=""
					width="32"
					height="32"
					className="rounded-full mr-3"
				/>
			)}
			<span>{props.children}</span>
		</a>
	</Link>
);
