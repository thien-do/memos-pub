import { Fragment } from "react";
import { ContentRequest } from "../content/type";

interface Props {
	request: ContentRequest;
}

export const TenantBreadcrumb = (props: Props): JSX.Element => {
	const { owner, path, repo } = props.request;
	return (
		<div className="flex items-center">
			<div className="not-prose">
				<img
					src={`https://github.com/${owner}.png?s=16`}
					alt=""
					width="32"
					height="32"
					className="rounded-full"
				/>
			</div>
			<div className="ml-3">
				<span>{owner}</span>
				{" / "}
				<a>{repo}</a>
				{path
					.split("/")
					.slice(0, -1)
					.map((part, index) => (
						<Fragment key={index}>
							{" / "}
							<a>{part}</a>
						</Fragment>
					))}
			</div>
		</div>
	);
};
