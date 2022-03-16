import afterDark from "./after-dark.png";
import beforeDark from "./before-dark.png";
import afterLight from "./after-light.png";
import beforeLight from "./before-light.png";
import { HomeGalleryFigure } from "./figure";

export const HomeGallery = (): JSX.Element => (
	<div
		className={[
			"flex items-center text-center",
			"w-[90vw] relative left-1/2 ml-[-45vw]",
		].join(" ")}
	>
		<HomeGalleryFigure
			image={{
				light: beforeLight,
				dark: beforeDark,
				alt: "Beautiful article displayed on memos.pub",
			}}
			caption={[
				["https://github.com/", "light"],
				["axieinfinity", "bold"],
				["/", "light"],
				["festival", "bold"],
				"break",
				["/blob/master/", "light"],
				["component_export.md", "bold"],
			]}
		/>
		<div>→</div>
		<HomeGalleryFigure
			image={{
				light: afterLight,
				dark: afterDark,
				alt: "Beautiful article displayed on memos.pub",
			}}
			caption={[
				["https://", "light"],
				["axieinfinity", "bold"],
				[".memos.pub", "light"],
				"break",
				["/", "light"],
				["festival", "bold"],
				["/", "light"],
				["component_export.md", "bold"],
			]}
		/>
	</div>
);
