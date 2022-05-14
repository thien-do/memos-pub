import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BlogNavRing } from "./ring";

interface Props {
	href: string;
}

export const BlogNavImg = (props: Props): JSX.Element | null => {
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

	return (
		<span className="mr-3 relative block ">
			{busy ? <BlogNavRing size={32} width={2} /> : null}
			<img
				className={[
					"rounded-full transition-transform relative duration-300 ease-out",
					busy ? "scale-50 delay-300" : "",
				].join(" ")}
				src={props.href}
				alt=""
				width={32}
				height={32}
			/>
		</span>
	);
};
