import { BlogGitlabRequest } from "../type";

const ensureType = (type: string): type is BlogGitlabRequest["type"] => {
	return ["tree", "blob"].includes(type);
};

/**
 * PageParams comes from outside so it's expectedly loose (fields are optional,
 * and the request itself may also be undefined)
 */
type PageParams = { slug: string[] | undefined } | undefined;

// slug could be:
// gitlab-com/gl-infra/ci-runners/deployer
// gitlab-org/gitaly
// gitlab-org/gitaly/-/blob/master/doc/sidechannel.md
// gitlab-org/gitlab/-/tree/master/doc
export const parseBlogGitlabRequest = (page: PageParams): BlogGitlabRequest => {
	if (page === undefined) throw Error("page params is undefined");
	const { slug } = page;
	if (slug === undefined) throw Error("slug is undefined");

	const [project, resource] = slug.join("/").split("/-/");

	// Repo root
	if (resource === undefined) {
		return { project, path: null, ref: null, type: "tree" };
	}

	// Repo resource
	const [type, ref, ...paths] = resource.split("/");
	const path = paths.join("/");
	if (!ensureType(type)) throw Error(`Unknown type: "${type}"`);

	const request: BlogGitlabRequest = { project, path, ref, type };
	return request;
};
