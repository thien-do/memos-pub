import { AppProse } from "../../app/prose";
import { HomeGalleryDemo } from "./demo";
import { HomeGalleryExamples } from "./examples";

export const HomeGallery = (): JSX.Element => (
	<div className="bg-gray-50 dark:bg-gray-900">
		<AppProse>
			<p>
				<strong>Memos.pub</strong> is different that you don{"'"}t need
				to sign up or set up anything. In fact, any public repo with
				some Markdown files is already a blog at{" "}
				<strong>{"<user>.memos.pub/<repo>"}</strong>:
			</p>
			<HomeGalleryDemo />
			<HomeGalleryExamples />
		</AppProse>
	</div>
);
