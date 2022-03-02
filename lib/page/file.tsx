import { ContentFile } from "../content/type";

interface Props {
	content: ContentFile;
}

export const PageFile = (props: Props): JSX.Element => (
	<div className="py-16 bg-white overflow-hidden">
		<div className="px-4 sm:px-6 lg:px-8">
			<div
				className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto"
				dangerouslySetInnerHTML={{ __html: props.content.html }}
			/>
		</div>
	</div>
);
