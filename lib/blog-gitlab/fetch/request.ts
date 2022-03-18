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

	// Default to repo root
	const request: BlogGitlabRequest = {
		project,
		path: "",
		ref: null,
		type: "tree",
	};

	// Repo resource
	if (resource !== undefined) {
		const [type, ref, ...paths] = resource.split("/");
		if (!ensureType(type)) throw Error(`Unknown type: "${type}"`);
		request.path = paths.join("/");
		request.ref = ref;
		request.type = type;
	}

	return request;
};
