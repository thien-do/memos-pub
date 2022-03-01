const PREFIXES: Record<string, string | undefined> = {
	huytd: "github.com/huytd/everyday/blob/main/notes",
	noob: "github.com/MQuy/MQuy/blob/master/notes",
};

export const expandPath = (params: {
	site: string | undefined;
	segments: string[];
}): string[] => {
	const { site, segments } = params;
	if (site === undefined) return segments;
	const prefix = PREFIXES[site];
	if (prefix === undefined) throw Error(`Unknown site "${site}"`);
	return [...prefix.split("/"), ...segments];
};

export const collapsePath = (params: {
	site: string | undefined;
	segments: string[];
}): string[] => {
	const { site, segments } = params;
	if (site === undefined) return segments;
	const prefix = PREFIXES[site];
	if (prefix === undefined) throw Error(`Unknown site "${site}"`);
	return segments.join("/").replace(prefix, "").split("/");
};
