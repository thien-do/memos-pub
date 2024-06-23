import { LayoutProse } from "@/lib/app/layout/prose";
import { HomeOverviewTry } from "./try";

export const HomeOverview = (): JSX.Element => (
	<LayoutProse>
		<h1>
			<span className="text-gray-500 dark:text-gray-400">
				Markdown Blogging,
			</span>
			<br />
			<span>Without Setup or Signup</span>
		</h1>
		<p>
			<strong>memos-pub.thien.do</strong> instantly makes a blog out of any public
			GitHub repo, with beautiful typography, MDX support, custom domain,
			and more. Try it:
		</p>
		<HomeOverviewTry />
		<p>Or see some examples below ↓</p>
	</LayoutProse>
);
