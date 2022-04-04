import Link from "next/link";

interface Props {
	href: string;
	children: string;
	image?: string;
}

export const BlogBreadcrumbItem = (props: Props): JSX.Element => (
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
