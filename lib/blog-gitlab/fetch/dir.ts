import { BlogDir, BlogDirEntry } from "@/lib/blog/type";
import { BlogGitlabRequest } from "../type";

interface RawItem {
	name: string;
	type: string;
}

type RawResponse = RawItem[];

const getEntryType = (raw: string): BlogDirEntry["type"] => {
	switch (raw) {
		case "blob":
			return "file";
		case "tree":
			return "dir";
	}
	throw Error(`Unknown type: "${raw}`);
};

const parse = (raw: RawResponse): BlogDir => {
	const entries: BlogDirEntry[] = raw.map((item) => ({
		name: item.name,
		type: getEntryType(item.type),
	}));
	const dir: BlogDir = { type: "dir", readme: null, entries };
	return dir;
};

// https://gitlab.com/api/v4/projects/gitlab-org%2Fgitlab/repository/tree/?path=doc&ref=master
const fetchRaw = async (request: BlogGitlabRequest): Promise<RawResponse> => {
	const url = [
		"https://gitlab.com/api/v4/projects",
		`/${encodeURIComponent(request.project)}`,
		"/repository/tree",
		`?path=${encodeURIComponent(request.path)}`,
		`&ref=${request.ref}`,
	].join("/");
	const response = await fetch(url);
	const raw = (await response.json()) as RawResponse;
	return raw;
};

export const fetchBlogGitlabDir = async (
	request: BlogGitlabRequest
): Promise<BlogDir> => {
	const raw = await fetchRaw(request);
	const dir = parse(raw);
	return dir;
};
