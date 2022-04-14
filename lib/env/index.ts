export const getEnvRootHost = (): string => {
	const host = process.env.NEXT_PUBLIC_ROOT_HOST;
	if (host === undefined) throw Error("ROOT_HOST is not defined");
	return host;
};

/**
 * It's expected that this would fail in browser
 */
export const getEnvGitHubToken = (): string => {
	const token = process.env.GITHUB_TOKEN;
	if (token === undefined) throw Error("GITHUB_TOKEN is not defined");
	return token;
};
