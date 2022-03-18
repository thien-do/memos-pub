import { resolveBlogGitlabMdxUrl } from "@/lib/blog-gitlab/mdx/url";
import { BlogGitlabRequest } from "@/lib/blog-gitlab/type";
import { resolveBlogMdxUrl } from "@/lib/blog/mdx/url";
import { BlogRequestWithRef } from "@/lib/blog/type";
import { Options as rehypeUrlOptions } from "@jsdevtools/rehype-url-inspector";

type CommonRequest = BlogRequestWithRef | BlogGitlabRequest;

const getRaw = (request: CommonRequest, url: string): string => {
	switch (request.source) {
		case "github":
			return resolveBlogMdxUrl({ request, url });
		case "gitlab":
			return resolveBlogGitlabMdxUrl({ request, url });
	}
};

export const getRehypeUrlOptions = (
	request: CommonRequest
): rehypeUrlOptions => ({
	selectors: ["img[src]"],
	inspectEach: (match) => {
		const { url, node, propertyName } = match;
		if (node.tagName !== "img") return;
		if (propertyName !== "src") return;
		if (url.startsWith("http")) return;
		const raw = getRaw(request, url);
		node.properties = node.properties ?? {};
		node.properties["src"] = raw;
	},
});
