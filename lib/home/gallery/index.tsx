import { LayoutProse } from "@/lib/app/layout/prose";
import { HomeGalleryDemo } from "./demo";
import { HomeGalleryExamples } from "./examples";

export const HomeGallery = (): JSX.Element => (
	<div className="bg-gray-50 dark:bg-gray-900">
		<LayoutProse>
			<p>
				<strong>memos-pub.thien.do</strong> is different that you don{"'"}t need
				to sign up or set up anything. In fact, any public repo with
				some Markdown files is already a blog at{" "}
				<strong>{"<user>.memos-pub.thien.do/<repo>"}</strong>:
			</p>
			<HomeGalleryDemo />
			<HomeGalleryExamples />
		</LayoutProse>
	</div>
);
