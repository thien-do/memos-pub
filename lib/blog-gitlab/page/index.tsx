export interface BlogGitlabPageProps {
	slug: string[];
}

export const BlogGitlabPage = (props: BlogGitlabPageProps): JSX.Element => (
	<div>{JSON.stringify(props.slug)}</div>
);
