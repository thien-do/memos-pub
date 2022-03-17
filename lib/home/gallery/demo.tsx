import afterDark from "./after-dark.png";
import beforeDark from "./before-dark.png";
import afterLight from "./after-light.png";
import beforeLight from "./before-light.png";
import { HomeGalleryDemoFigure } from "./demo-figure";

export const HomeGalleryDemo = (): JSX.Element => (
	<div
		className={[
			"md:flex md:items-center text-center",
			"md:w-[90vw] md:relative md:left-1/2 md:ml-[-45vw]",
		].join(" ")}
	>
		<HomeGalleryDemoFigure
			url="https://github.com/axieinfinity/festival/blob/master/component_export.md"
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
		<div>
			<div className="hidden md:block">→</div>
			<div className="block md:hidden">↓</div>
		</div>
		<HomeGalleryDemoFigure
			url="https://axieinfinity.memos.pub/festival/component_export.md"
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
