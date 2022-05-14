import Link from "next/link";
import { BlogNavImg } from "./img";

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
			<a className="font-normal no-underline not-prose flex items-center">
				{image ? <BlogNavImg href={image} /> : null}
				<span>{children}</span>
			</a>
		</Link>
	);
};
