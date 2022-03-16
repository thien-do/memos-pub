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
	<figcaption className="mt-0 xl:mt-0 2xl:mt-0">
		{props.caption.map((part, index) =>
			part === "break" ? (
				<br key={index} />
			) : (
				<span
					key={index}
					className={
						part[1] === "light"
							? "text-gray-400 dark:text-gray-600"
							: "text-gray-700 dark:text-gray-300"
					}
				>
					{part[0]}
				</span>
			)
		)}
	</figcaption>
);

export const HomeGalleryFigure = (props: Props): JSX.Element => (
	<figure>
		<FigureCaption {...props} />
		<FigureImage {...props} />
	</figure>
);
