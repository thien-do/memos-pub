import Link from "next/link";

export interface BlogNavItem {
	href: string;
	children: string;
	image: string | null;
}

interface Props {
	item: BlogNavItem;
}

export const BlogNavItemLink = (props: Props): JSX.Element => {
	const { children, href, image } = props.item;
	return (
		<Link href={href}>
			<a
				className={[
					"font-normal no-underline not-prose",
					"flex items-center",
				].join(" ")}
			>
				{image !== null && (
					<img
						src={image}
						alt=""
						width="32"
						height="32"
						className="rounded-full mr-3"
					/>
				)}
				<span>{children}</span>
			</a>
		</Link>
	);
};
