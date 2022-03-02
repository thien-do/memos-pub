import { components } from "@octokit/openapi-types";
import { isNotNull } from "../utils/not-null";
import { ContentDir, ContentDirEntry } from "./type";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

const ensureDirEntryType = (type: string): type is ContentDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirEntry = (raw: RawDirEntry): ContentDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const isValidEntry = (raw: RawDirEntry): boolean => {
	if (raw.name.startsWith(".")) return false;
	if (raw.name.startsWith("_")) return false;
	if (raw.name.endsWith(".md")) return true;
	if (raw.type === "dir") return true;
	return false;
};

export const makeContentDir = (raw: RawDir): ContentDir => {
	const entries: ContentDirEntry[] = raw
		.filter(isValidEntry)
		.map(toDirEntry)
		.filter(isNotNull);
	const dir: ContentDir = { type: "dir", entries };
	return dir;
};
