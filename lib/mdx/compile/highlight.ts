import * as shiki from "shiki";
import { join as pathJoin } from "path";
import { readdir as fsReaddir } from "fs/promises";

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => {
	return pathJoin(process.cwd(), "lib/mdx/shiki");
};

const touched = { current: false };

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
	if (touched.current) return; // only need to do once
	fsReaddir(getShikiPath()); // fire and forget
	touched.current = true;
};

export const getMdxHighlighter = async (): Promise<shiki.Highlighter> => {
	touchShikiPath();

	const highlighter = await shiki.getHighlighter({
		theme: "github-dark",
		paths: {
			languages: `${getShikiPath()}/languages/`,
			themes: `${getShikiPath()}/themes/`,
		},
	});

	return highlighter;
};
