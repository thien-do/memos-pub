import nodepath from "path";
import { BlogGitlabRequest } from "../type";

interface Props {
	request: BlogGitlabRequest;
	url: string;
}

/**
 * Resolve gitlab relative url to absolute
 * From:
 * - https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/development/cicd/index.md
 * - img/ci_architecture.png
 * To:
 * - https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/development/cicd/img/ci_architecture.png
 */
export const resolveBlogGitlabMdxUrl = (props: Props): string => {
	const { url, request } = props;
	const { project, ref, path: mdPath } = request;
	const dirname = nodepath.dirname(mdPath);
	const assetPath = nodepath.join(dirname, url);
	const origin = "https://gitlab.com";
	return `${origin}/${project}/-/raw/${ref}/${assetPath}`;
};
