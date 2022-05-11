import { BlogContent } from "../content/type";
import { BlogRequest } from "../request/type";

/**
 * PageParams comes from outside so it's expectedly loose (fields are optional,
 * and the request itself may also be undefined)
 */
export interface BlogPageParams extends NodeJS.Dict<string | string[]> {
	domain: string | undefined;
	owner: string | undefined;
	slug: string[] | undefined;
}

export interface BlogPageProps {
	content: BlogContent;
	request: BlogRequest;
}
