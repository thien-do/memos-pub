import Image, { ImageProps } from "next/image";
import { Fragment } from "react";

type CaptionPart = [string, "bold" | "light"];

interface Props {
	caption: (CaptionPart | "break")[];
	image: {
		light: ImageProps["src"];
		dark: ImageProps["src"];
		alt: ImageProps["alt"];
	};
	url: string;
}

const FigureImage = (props: Props): JSX.Element => (
	<Fragment>
		<div className="block dark:hidden">
			<Image src={props.image.light} alt={props.image.alt} />
		</div>
		<div className="hidden dark:block">
			<Image src={props.image.dark} alt={props.image.alt} />
		</div>
	</Fragment>
);

const FigureCaption = (props: Props): JSX.Element => (
	<figcaption>
		{props.caption.map((part, index) =>
			part === "break" ? (
				<br key={index} />
			) : (
				<span
					key={index}
					className={
						part[1] === "light"
							? "text-gray-500 dark:text-gray-400"
							: "text-gray-900 dark:text-white"
					}
				>
					{part[0]}
				</span>
			)
		)}
	</figcaption>
);

export const HomeGalleryDemoFigure = (props: Props): JSX.Element => (
	<a href={props.url} target="_blank" rel="noreferrer">
		<figure>
			<FigureImage {...props} />
			<FigureCaption {...props} />
		</figure>
	</a>
);
