import { NextPage } from "next";

const Page: NextPage<{}> = () => {
	return <div>vercel_url: {process.env.VERCEL_URL}</div>;
};

export default Page;
