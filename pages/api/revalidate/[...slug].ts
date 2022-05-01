import { NextApiHandler } from "next";
import { join as pathJoin } from "path";

// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
const handler: NextApiHandler = async (req, res) => {
	const slug = req.query.slug;
	const parts: string[] = Array.isArray(slug) ? slug : [slug];
	const path = pathJoin(...parts);
	await res.unstable_revalidate(`/${path}`);
	return res.json({ path, success: true });
};

export default handler;
