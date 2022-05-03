import { OctokitResponse } from "@octokit/types";
import { Redis } from "@upstash/redis";
import { GitHubRequest } from "../type";
import { GitHubContent } from "./type";

type GitHubResponse = OctokitResponse<GitHubContent>;

const redisRef: {
	ready: boolean;
	current: Redis | null;
} = {
	ready: false,
	current: null,
};

const makeRedis = (): Redis | null => {
	if (typeof window !== "undefined") {
		throw Error("Should not create Redis on client");
	}
	const url = process.env.UPSTASH_REDIS_REST_URL;
	const token = process.env.UPSTASH_REDIS_REST_TOKEN;
	if (token === undefined || url === undefined) {
		console.info("Redis is not setup, skip cache");
		return null;
	}
	const redis = new Redis({ url, token });
	return redis;
};

const getRedis = (): Redis | null => {
	if (redisRef.ready === true) return redisRef.current;
	const redis = makeRedis();
	redisRef.current = redis;
	return redis;
};

const getKey = (request: GitHubRequest): string => {
	const { owner, path, repo } = request;
	const key = `${owner}/${repo}/${path}`;
	return key;
};

export const getGitHubCache = async (
	request: GitHubRequest
): Promise<GitHubResponse | null> => {
	const redis = getRedis();
	if (redis === null) {
		return null;
	}
	const key = getKey(request);
	const data = await redis.get<null | GitHubResponse>(key);
	return data;
};

export const setGitHubCache = async (
	request: GitHubRequest,
	response: GitHubResponse
): Promise<void> => {
	const redis = getRedis();
	if (redis === null) return;
	const key = getKey(request);
	await redis.set(key, response);
};
