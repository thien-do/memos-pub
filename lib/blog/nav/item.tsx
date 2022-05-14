import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface BlogNavItem {
	href: string;
	children: string;
	image: string | null;
}

interface Props {
	item: BlogNavItem;
}

export const BlogNavItemLink = (props: Props): JSX.Element => (
	<Link href={props.item.href}>
		<a className="font-normal no-underline not-prose flex items-center">
			<Img {...props} />
			<span>{props.item.children}</span>
		</a>
	</Link>
);

const size = 32;
const border = 2;

const Img = (props: Props): JSX.Element | null => {
	const router = useRouter();
	const [busy, setBusy] = useState<boolean>(false);

	useEffect(() => {
		const start = () => void setBusy(true);
		const stop = () => void setBusy(false);

		router.events.on("routeChangeStart", start);
		router.events.on("routeChangeComplete", stop);
		router.events.on("routeChangeError", stop);

		return () => {
			router.events.off("routeChangeStart", start);
			router.events.off("routeChangeComplete", stop);
			router.events.off("routeChangeError", stop);
		};
	}, [router]);

	const image = props.item.image;
	if (image === null) return null;
	const radius = (size - border) / 2;
	const circumference = Math.round(radius * 2 * Math.PI);

	return (
		<span className="mr-3 relative block ">
			{busy ? (
				<svg className="animate-spin absolute inset-0" width={size} height={size}>
					<circle
						className="stroke-gray-900 dark:stroke-white"
						strokeWidth={border}
						fill="transparent"
						stroke="red"
						strokeDashoffset={Math.round(circumference * 0.75)}
						strokeDasharray={circumference}
						r={radius}
						cx={size / 2}
						cy={size / 2}
					/>
				</svg>
			) : null}
			<img
				className={[
					"rounded-full transition-transform relative duration-300 ease-out",
					busy ? "scale-50 delay-300" : "",
				].join(" ")}
				src={image}
				alt=""
				width={size}
				height={size}
			/>
		</span>
	);
};
