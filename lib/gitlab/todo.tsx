const getItems = (request: BlogGitLabRequest): BlogBreadcrumbItemProps[] => {
	const { path, project, ref } = request;

	const items: BlogBreadcrumbItemProps[] = [];

	// Project
	const image =
		"https://gitlab.com/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png?width=64";
	let href = `/${project}/-/tree/${ref}`;
	items.push({ image, href, children: project });

	// Path
	if (path !== "") {
		path.split("/").forEach((name) => {
			href = `${href}/${name}`;
			items.push({ href, children: name });
		});
	}

	// Last item is already shown as the page's title
	if (items.length > 1) {
		items.pop();
	}

	return items;
};

const getHref = (props: Props): string => {
	const { path, project, ref } = props.request;
	const { name, type } = props.entry;
	const parts = [project, "-", getType(type), ref, path, name];
	const href = `/${parts.filter((p) => p !== "").join("/")}`;
	return href;
};

const getTitle = (props: Props): string => {
	const { project, path } = props.request;
	// Use current dir name from path first
	const dir = path.split("/").pop();
	if (dir !== "" && dir !== undefined) return dir;
	// Else (path is empty -> at repo root) we use project
	const repo = project.split("/").pop();
	if (repo !== "" && repo !== undefined) return repo;
	throw Error(`repo is undefined or empty string`);
};
