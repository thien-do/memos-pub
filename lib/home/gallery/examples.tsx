import { Fragment } from "react";

const Link = (props: { url: string }): JSX.Element => (
	<a href={props.url} target="_blank" rel="noreferrer">
		{props.url.replace("https://", "")}
	</a>
);

export const HomeGalleryExamples = (): JSX.Element => (
	<Fragment>
		<h3>Examples</h3>
		<ul>
			<li>
				<span>Notes: </span>
				<Link url="https://keyvanakbary.memos.pub/learning-notes" />
			</li>
			<li>
				<span>Notes: </span>
				<Link url="https://khaosdoctor.memos.pub/my-notes" />
				<span> (🇵🇹)</span>
			</li>
			<li>
				<span>Notes: </span>
				<Link url="https://mgp.memos.pub/book-notes" />
			</li>
			<li>
				<span>Notes: </span>
				<Link url="https://mquy.memos.pub/mquy/notes" />
			</li>
			<li>
				<span>Profile (custom domain): </span>
				<Link url="https://thien.do" />
			</li>
			<li>
				<span>Magazine: </span>
				<Link url="https://ruanyf.memos.pub/weekly/docs" />
				<span> (🇨🇳)</span>
			</li>
		</ul>
	</Fragment>
);
