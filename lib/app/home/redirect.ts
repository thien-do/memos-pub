import { useRouter } from "next/router";
import { useEffect } from "react";

// Return location, or null if not valid
const getLocation = (): Location | null => {
	if (typeof window === "undefined") return null; // server
	const location = window.location;
	if (location.hash === "") return null;
	if (location.hash.startsWith("#https://github.com/") === false) return null;
	return location;
};

/**
 * Transform full path to our url format (owner.memos.pub/repo/path).
 * Example inputs:
 * - #https://github.com/thien-do/notes/blob/main/hello-world.md
 * - #https://github.com/thien-do/notes
 */
const getUrl = (location: Location): string => {
	const { host, protocol, hash } = location;
	const [_protocol, _empty, _gh, owner, repo, _type, _branch, ...paths] =
		location.hash.split("/");
	const path = paths.join("/");
	const url = `${protocol}//${owner}.${host}/${repo}/${path}`;
	return url;
};

export const useAppHomeRedirect = (): void => {
	const router = useRouter();

	useEffect(() => {
		const location = getLocation();
		if (location === null) return;
		const url = getUrl(location);
		router.push(url);
	}, [router]);
};
